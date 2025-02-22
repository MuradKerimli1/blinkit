import Stripe from "stripe";
import { helper } from "./helper";

const stripe = new Stripe(helper.stripe_secret_key!);

export default stripe;
