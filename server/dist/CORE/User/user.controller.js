"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../DAL/Entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = require("../../DAL/Config/nodemailer");
const helper_1 = require("../../DAL/Config/helper");
const accessToken_1 = require("../../DAL/Lib/accessToken");
const refreshToken_1 = require("../../DAL/Lib/refreshToken");
const generateOtp_1 = __importDefault(require("../../DAL/Lib/generateOtp"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../Utility/AppError"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new AppError_1.default("Name, email, and password are required", 400));
        }
        const newUser = new user_entity_1.User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        // Validate the user data
        const handleError = yield (0, class_validator_1.validate)(newUser);
        if (handleError.length > 0) {
            return next(new AppError_1.default(handleError
                .map((item) => {
                const constraints = item.constraints || {};
                return Object.values(constraints).join(", ");
            })
                .join("\n"), 400));
        }
        // Check if user exists
        const existUser = yield user_entity_1.User.findOne({ where: { email: newUser.email } });
        if (existUser) {
            return next(new AppError_1.default("email  already exists", 409));
        }
        // Hash password
        newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
        // Save user
        yield newUser.save();
        const mailOptions = {
            from: process.env.NODEMAILER_NAME,
            to: newUser.email,
            subject: "BLINKIT",
            text: `QEYDIYATDAN KECDINIZ ARTIQ BIZDENSINIZ`,
        };
        nodemailer_1.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
            }
            else {
                console.log("Mail sent successfully");
            }
        });
        // Response
        res.status(201).json({ message: "User successfully added", success: true });
    }
    catch (error) {
        console.error("Error during registration:", error);
        next(new AppError_1.default("Server internal error", 500));
    }
});
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const existUser = yield user_entity_1.User.findOne({
            where: {
                id: code,
            },
        });
        if (!existUser) {
            return next(new AppError_1.default("User not found", 404));
        }
        existUser.verify_email = true;
        yield existUser.save();
        res.status(200).send("Email verifed");
    }
    catch (error) {
        console.error("Error during registration:", error);
        next(new AppError_1.default("server internal error", 500));
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError_1.default("Email və şifrə tələb olunur!", 400));
        }
        //! check paramters
        // check email
        const existUser = yield user_entity_1.User.findOne({ where: { email: email } });
        if (!existUser) {
            return next(new AppError_1.default("Email tapılmadı!", 404));
        }
        // check status
        if (existUser.status !== "Active") {
            return next(new AppError_1.default("Hesab aktiv deyil. Administratorla əlaqə saxlayın!", 401));
        }
        // check password
        const validatePass = yield bcrypt_1.default.compare(password, existUser.password);
        if (!validatePass) {
            return next(new AppError_1.default("Yanlış şifrə!", 400));
        }
        //! token
        const access = (0, accessToken_1.createTokenanSet)(existUser.id);
        const refresh = yield (0, refreshToken_1.refreshToken)(existUser.id);
        //! last login
        yield user_entity_1.User.update({ id: existUser.id }, {
            last_login_date: new Date(),
        });
        //! setcookie
        res.cookie("accessToken", access, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.cookie("refreshToken", refresh, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({
            message: "Giriş uğurla tamamlandı!",
            success: true,
            data: {
                accessToken: access,
                refreshToken: refresh,
                user: existUser,
            },
        });
    }
    catch (error) {
        console.error("Error during registration:", error);
        next(new AppError_1.default("server internal error", 500));
    }
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        yield user_entity_1.User.update({ id: user === null || user === void 0 ? void 0 : user.id }, { refresh_token: "" });
        res.status(200).json({ message: "Logout Successfuly", sucess: true });
    }
    catch (error) {
        console.error("Error during registration:", error);
        next(new AppError_1.default("server internal error", 500));
    }
});
const uploadAvatar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const user = req.user;
        if (!file) {
            return next(new AppError_1.default("xeta bas verdi tezeden yoxlayin", 400));
        }
        const existUser = yield user_entity_1.User.findOne({ where: { id: user === null || user === void 0 ? void 0 : user.id } });
        if (!existUser) {
            return next(new AppError_1.default("user not found", 404));
        }
        existUser.avatar = file.path;
        yield existUser.save();
        res.status(200).json({
            message: "avatar elave edildi",
            success: true,
            avatar: existUser.avatar,
        });
    }
    catch (error) {
        console.error("Error during registration:", error);
        next(new AppError_1.default("server internal error", 500));
    }
});
const updateUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("geldie ");
        const { name, email, password, mobile } = req.body;
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default("Unauthorized", 401));
        }
        let hashedPassword;
        if (password) {
            hashedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (hashedPassword)
            user.password = hashedPassword;
        if (mobile)
            user.mobile = mobile;
        yield user.save();
        res.status(200).json({
            message: "User details updated successfully",
            success: true,
            details: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            },
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        next(new AppError_1.default("Internal server error", 500));
    }
});
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return next(new AppError_1.default("email are required", 400));
        }
        const existEmail = yield user_entity_1.User.findOne({ where: { email: email } });
        if (!existEmail) {
            return next(new AppError_1.default("email not found", 400));
        }
        const otp = (0, generateOtp_1.default)();
        const expireTime = new Date(Date.now() + 60 * 60 * 1000); //1saat
        // save otp and exire
        yield user_entity_1.User.update({ id: existEmail.id }, {
            forgot_password_otp: otp,
            forgot_password_expiry: expireTime,
        });
        // send email
        const mailOptions = {
            from: helper_1.helper.nodemailer_name,
            to: existEmail.email,
            subject: "Blinkit",
            text: `Your reset password code - ${otp}.It expired on ${expireTime}`,
        };
        nodemailer_1.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
            }
            else {
                console.log("mail gonderildi");
            }
        });
        res
            .status(200)
            .json({ message: "your otp has been sended", success: true });
    }
    catch (error) {
        console.error("Error during registration:", error);
        next(new AppError_1.default("server internal error", 500));
    }
});
const verifyForgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return next(new AppError_1.default("email and otp are required", 400));
        }
        const user = yield user_entity_1.User.findOne({ where: { email: email } });
        if (!user) {
            return next(new AppError_1.default("email not found", 404));
        }
        const currentTime = new Date();
        if (user.forgot_password_expiry < currentTime) {
            return next(new AppError_1.default("otp is exired", 400));
        }
        if (user.forgot_password_otp !== +otp) {
            return next(new AppError_1.default("otp is invalid", 400));
        }
        yield user_entity_1.User.update({ id: user.id }, {
            forgot_password_expiry: "",
            forgot_password_otp: 0,
        });
        res.status(200).json({ message: "verify otp successfuly", success: true });
    }
    catch (error) {
        console.error("Error during registration:", error);
        next(new AppError_1.default("server internal error", 500));
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("salam");
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return next(new AppError_1.default("Email, newPassword və confirmPassword tələb olunur", 400));
        }
        if (newPassword !== confirmPassword) {
            return next(new AppError_1.default("newPassword və confirmPassword eyni olmalıdır", 400));
        }
        // Şifrənin minimum uzunluğunu yoxla
        if (newPassword.length < 6) {
            return next(new AppError_1.default("Şifrə ən azı 6 simvol olmalıdır", 400));
        }
        const user = yield user_entity_1.User.findOne({ where: { email: email } });
        if (!user) {
            return next(new AppError_1.default("İstifadəçi tapılmadı", 404));
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield user_entity_1.User.update({ id: user.id }, { password: hashedPassword });
        res
            .status(200)
            .json({ message: "Şifrə uğurla dəyişdirildi", success: true });
    }
    catch (error) {
        console.error("Error during password reset:", error);
        next(new AppError_1.default("Daxili server xətası", 500));
    }
});
// refresh token
const refreshTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const refresh_token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || ((_c = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1]);
        if (!refresh_token) {
            return next(new Error("refresh token are invalid"));
        }
        const verifyRefreshToken = yield jsonwebtoken_1.default.verify(refresh_token, helper_1.helper.secret_key_refresh);
        if (!verifyRefreshToken) {
            return next(new Error("refresh token are invalid"));
        }
        const userId = Number(verifyRefreshToken.sub);
        const accessToken = (0, accessToken_1.createTokenanSet)(userId);
        res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.status(200).json({
            message: "new access token generated",
            accessToken: accessToken,
        });
    }
    catch (error) {
        console.error("Error during password reset:", error);
        next(new Error("Daxili server xətası"));
    }
});
// userdetails
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return next(new AppError_1.default("Unauthorized", 401));
        }
        // burda sifre ve refresh token vermek olmaz
        res.status(200).json({
            message: "user details",
            success: true,
            user: user,
        });
    }
    catch (error) {
        console.error("Error during password reset:", error);
        next(new AppError_1.default("Daxili server xətası", 500));
    }
});
const userController = () => {
    return {
        registerUser,
        verifyEmail,
        loginUser,
        logout,
        uploadAvatar,
        updateUserDetails,
        forgotPassword,
        verifyForgotPassword,
        resetPassword,
        refreshTokenController,
        getUserDetails,
    };
};
exports.userController = userController;
//# sourceMappingURL=user.controller.js.map