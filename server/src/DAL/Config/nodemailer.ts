import nodemailer from "nodemailer";
import { helper } from "./helper";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: helper.nodemailer_name,
    pass: helper.nodemailer_pass,
  },
});
