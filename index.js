import express from "express";
import initApp from "./app.router.js";
import dotenv from "dotenv";
// import sendEmail from "./utilis/SendEmail.js";
dotenv.config();
const app = express();
// sendEmail({
//   bcc: ["an1520@fayoum.edu.eg"],
//   subject: "Hello Mr Ahmed",
//   text: "Hello Mr Ahmed",
// });
initApp(app, express);
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
