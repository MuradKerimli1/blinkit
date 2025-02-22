import jwt from "jsonwebtoken";
import { helper } from "../Config/helper";
import { User } from "../Entities/user.entity";

export const refreshToken = async (userId: number) => {
  const payload = {
    sub: userId,
  };

  const token = jwt.sign(payload, helper.secret_key_refresh, { expiresIn: "7d" });

  await User.update({ id: userId }, { refresh_token: token });

  return token;
};
