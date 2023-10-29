import Router from "express";
import * as AuthController from "../auth.js";
import auth from "../../../../MiddleWare/authorization.js";
import Validation from "../../../../MiddleWare/Validation.middle.js";
import * as Validators from "../../../../MiddleWare/Validation.js";
const router = Router();

router.post(
  "/signup",
  Validation(Validators.SignUpschema),
  AuthController.signup
);
router.get("/confirmEmail/:token", AuthController.confirmEmail);
router.get("/newConfirmEmail/:token", AuthController.newConfirmEmail);
router.post("/login", Validation(Validators.Loginschema), AuthController.login);

export default router;
