"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
require("dotenv/config");
exports.helper = {
    port: process.env.PORT,
    front_url: process.env.FRONT_END_URL,
    db_name: process.env.DB_NAME,
    nodemailer_name: process.env.NODEMAILER_NAME,
    nodemailer_pass: process.env.NODEMAILER_PASS,
    secret_key_access: process.env.SECRET_KEY_ACCESS || "secretKey",
    secret_key_refresh: process.env.SECRET_KEY_REFRESH || "secretKeyasdas",
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_key: process.env.CLOUDINARY_KEY,
    cloudinary_secret: process.env.CLOUDINARY_SECRET,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};
//# sourceMappingURL=helper.js.map