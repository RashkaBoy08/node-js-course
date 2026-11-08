import jwt from "jsonwebtoken";

export function generateToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ id: userId.toString() }, secret, {
    expiresIn: "5d",
    algorithm: "HS256",
  });
}
