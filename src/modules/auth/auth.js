import { Compare, Hash } from "../../../utilis/HashAndCompare.js";
import usermodel from "../../../DataBase/user.model.js";
import {
  DecodeToken,
  GenerateToken,
} from "../../../utilis/GenerateTokenAndVerify.js";
import AsyncHandler from "express-async-handler";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import sendEmail from "../../../utilis/SendEmail.js";
export const signup = async (req, res, next) => {
  try {
    console.log(req.protocol);
    console.log(req.headers);
    const { username, email, password, age, address, gender } = req.body;
    const search = await usermodel.findOne({ email });
    if (search) {
      return next(new Error("Email Exist", { cause: StatusCodes.CONFLICT }));
    }
    const token = GenerateToken({
      payload: { email },
      signature: process.env.EMAIL_TOKEN,
      expiresIn: 60 * 5,
    });
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;

    const refreshToken = GenerateToken({
      payload: { email },
      signature: process.env.EMAIL_TOKEN,
      expiresIn: 60 * 60 * 24 * 30,
    });
    const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`;

    const html = `<a href="${link}">Click Here To Confirm Your Email</a>
    <br><br>
    <a href="${refreshLink}">Click Here To ReConfirm Your Email</a>`;
    const info = await sendEmail({ to: email, subject: "Confirm Email", html });
    if (!info) {
      return next(new Error("Email Regected", { cause: 400 }));
    }

    const hashResult = Hash({ plaintext: password });
    const user = await usermodel.create({
      username,
      email,
      password: hashResult,
      age,
      address,
      gender,
    });
    return res.status(201).json({ Message: "Done", CreateUser: user._id });
  } catch (err) {
    console.log(`Fail to signup......${err}`);
  }
};

export const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    // return res.json({Message:"User not Exist"})
    return next(new Error("User not Exist"));
  }
  const match = Compare({ plaintext: password, HashValue: user.password });
  if (!match) {
    // return res.json({Message:"In-valid User"})
    return next(new Error("In-valid User"));
  }
  const token = GenerateToken({
    payload: { id: user._id, isloggedin: true },
    signature: process.env.TOKEN_SIGNATRUE,
  });
  return match
    ? res.json({ Message: "Done", token })
    : res.json({ Message: "Didn't Match" });
});

export const confirmEmail = AsyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { email } = DecodeToken({
    token,
    signature: process.env.EMAIL_TOKEN,
  });
  const user = await usermodel.updateOne(
    { email: email },
    { confirmEmail: true }
  );
  return user.modifiedCount
    ? res.status(200).redirect("https://mail.google.com/mail/u/0/#inbox")
    : res.status(400).send("Not Register Account");
});

export const newConfirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const { email } = DecodeToken({ token, signature: process.env.EMAIL_TOKEN });
  const newtoken = GenerateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN,
    expiresIn: 60 * 2,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newtoken}`;

  const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${token}`;

  const html = `<a href="${link}">Click Here To Confirm Your Email</a>
<br><br>
<a href="${refreshLink}">Click Here To ReConfirm Your Email</a>`;
  const info = await sendEmail({ to: email, subject: "Confirm Email", html });
  if (!info) {
    return next(new Error("Email Regected", { cause: 400 }));
  }
  return res.status(200).send("<p>Done Please Check your Email</p>");
};
