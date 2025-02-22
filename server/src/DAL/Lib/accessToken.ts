import jwt from "jsonwebtoken";
import { helper } from "../Config/helper";

export const createTokenanSet = (userId: number) => {
  const payload = {
    sub: userId,
  };

  const token = jwt.sign(payload, helper.secret_key_access, {
    expiresIn: "5h",
  });
  return token;
};
