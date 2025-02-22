import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { User } from "../../DAL/Entities/user.entity";
import bcrypt from "bcrypt";
import { transporter } from "../../DAL/Config/nodemailer";
import { helper } from "../../DAL/Config/helper";
import { createTokenanSet } from "../../DAL/Lib/accessToken";
import { refreshToken } from "../../DAL/Lib/refreshToken";
import generateOtp from "../../DAL/Lib/generateOtp";
import jwt from "jsonwebtoken";
import AppError from "../../Utility/AppError";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("Name, email, and password are required", 400));
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    // Validate the user data
    const handleError = await validate(newUser);

    if (handleError.length > 0) {
      return next(
        new AppError(
          handleError
            .map((item) => {
              const constraints = item.constraints || {};
              return Object.values(constraints).join(", ");
            })
            .join("\n"),
          400
        )
      );
    }

    // Check if user exists

    const existUser = await User.findOne({ where: { email: newUser.email } });

    if (existUser) {
      return next(new AppError("email  already exists", 409));
    }

    // Hash password
    newUser.password = await bcrypt.hash(newUser.password, 10);

    // Save user
    await newUser.save();

    const mailOptions = {
      from: process.env.NODEMAILER_NAME,
      to: newUser.email,
      subject: "BLINKIT",
      text: `QEYDIYATDAN KECDINIZ ARTIQ BIZDENSINIZ`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Mail sent successfully");
      }
    });

    // Response
    res.status(201).json({ message: "User successfully added", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    next(new AppError("Server internal error", 500));
  }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;
    const existUser = await User.findOne({
      where: {
        id: code,
      },
    });
    if (!existUser) {
      return next(new AppError("User not found", 404));
    }
    existUser.verify_email = true;
    await existUser.save();
    res.status(200).send("Email verifed");
  } catch (error) {
    console.error("Error during registration:", error);
    next(new AppError("server internal error", 500));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Email və şifrə tələb olunur!", 400));
    }

    //! check paramters

    // check email
    const existUser = await User.findOne({ where: { email: email } });
    if (!existUser) {
      return next(new AppError("Email tapılmadı!", 404));
    }
    // check status
    if (existUser.status !== "Active") {
      return next(
        new AppError("Hesab aktiv deyil. Administratorla əlaqə saxlayın!", 401)
      );
    }
    // check password
    const validatePass = await bcrypt.compare(password, existUser.password);
    if (!validatePass) {
      return next(new AppError("Yanlış şifrə!", 400));
    }

    //! token
    const access = createTokenanSet(existUser.id);
    const refresh = await refreshToken(existUser.id);

    //! last login
    await User.update(
      { id: existUser.id },
      {
        last_login_date: new Date(),
      }
    );
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
  } catch (error) {
    console.error("Error during registration:", error);
    next(new AppError("server internal error", 500));
  }
};
const logout = async (req: Request, res: Response, next: NextFunction) => {
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

    await User.update({ id: user?.id }, { refresh_token: "" });

    res.status(200).json({ message: "Logout Successfuly", sucess: true });
  } catch (error) {
    console.error("Error during registration:", error);
    next(new AppError("server internal error", 500));
  }
};
const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const user = req.user;
    if (!file) {
      return next(new AppError("xeta bas verdi tezeden yoxlayin", 400));
    }
    const existUser = await User.findOne({ where: { id: user?.id } });
    if (!existUser) {
      return next(new AppError("user not found", 404));
    }
    existUser.avatar = file.path;

    await existUser.save();
    res.status(200).json({
      message: "avatar elave edildi",
      success: true,
      avatar: existUser.avatar,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    next(new AppError("server internal error", 500));
  }
};

const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("geldie ");

    const { name, email, password, mobile } = req.body;
    const user = req.user;

    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (hashedPassword) user.password = hashedPassword;
    if (mobile) user.mobile = mobile;

    await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      success: true,
      details: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next(new AppError("Internal server error", 500));
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("email are required", 400));
    }

    const existEmail = await User.findOne({ where: { email: email } });
    if (!existEmail) {
      return next(new AppError("email not found", 400));
    }
    const otp = generateOtp();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); //1saat

    // save otp and exire
    await User.update(
      { id: existEmail.id },
      {
        forgot_password_otp: otp,
        forgot_password_expiry: expireTime,
      }
    );

    // send email
    const mailOptions = {
      from: helper.nodemailer_name,
      to: existEmail.email,
      subject: "Blinkit",
      text: `Your reset password code - ${otp}.It expired on ${expireTime}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("mail gonderildi");
      }
    });

    res
      .status(200)
      .json({ message: "your otp has been sended", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    next(new AppError("server internal error", 500));
  }
};
const verifyForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return next(new AppError("email and otp are required", 400));
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return next(new AppError("email not found", 404));
    }
    const currentTime = new Date();
    if (user.forgot_password_expiry < currentTime) {
      return next(new AppError("otp is exired", 400));
    }
    if (user.forgot_password_otp !== +otp) {
      return next(new AppError("otp is invalid", 400));
    }

    await User.update(
      { id: user.id },
      {
        forgot_password_expiry: "",
        forgot_password_otp: 0,
      }
    );

    res.status(200).json({ message: "verify otp successfuly", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    next(new AppError("server internal error", 500));
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("salam");

    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return next(
        new AppError("Email, newPassword və confirmPassword tələb olunur", 400)
      );
    }

    if (newPassword !== confirmPassword) {
      return next(
        new AppError("newPassword və confirmPassword eyni olmalıdır", 400)
      );
    }

    // Şifrənin minimum uzunluğunu yoxla
    if (newPassword.length < 6) {
      return next(new AppError("Şifrə ən azı 6 simvol olmalıdır", 400));
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return next(new AppError("İstifadəçi tapılmadı", 404));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ id: user.id }, { password: hashedPassword });

    res
      .status(200)
      .json({ message: "Şifrə uğurla dəyişdirildi", success: true });
  } catch (error) {
    console.error("Error during password reset:", error);
    next(new AppError("Daxili server xətası", 500));
  }
};


// refresh token
const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token =
      req.cookies?.refreshToken || req.headers?.authorization?.split(" ")[1];
    if (!refresh_token) {
      return next(new Error("refresh token are invalid"));
    }

    const verifyRefreshToken = await jwt.verify(
      refresh_token,
      helper.secret_key_refresh
    );
    if (!verifyRefreshToken) {
      return next(new Error("refresh token are invalid"));
    }
    const userId = Number(verifyRefreshToken.sub);
    const accessToken = createTokenanSet(userId);

    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.status(200).json({
      message: "new access token generated",
      accessToken: accessToken,
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    next(new Error("Daxili server xətası"));
  }
};

// userdetails

const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }
    // burda sifre ve refresh token vermek olmaz
    res.status(200).json({
      message: "user details",
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    next(new AppError("Daxili server xətası", 500));
  }
};

export const userController = () => {
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
