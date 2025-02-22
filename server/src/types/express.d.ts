import { User } from "../DAL/Entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
