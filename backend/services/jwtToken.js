/** @format */

import jwt from "jsonwebtoken";
import "dotenv/config";

export function generatojwtToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      userMail: user.email,
      isVerified: true,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
}
 