import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message:"max limit 100 in 15 minutes",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
export default limiter;
