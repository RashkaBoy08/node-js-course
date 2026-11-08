import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  const authorization = req.get("authorization");
  const match = authorization?.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    return res.status(401).json({ message: "Bearer token is required" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new Error("JWT_SECRET is not configured"));
  }

  let payload;
  try {
    payload = jwt.verify(match[1], secret, { algorithms: ["HS256"] });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  if (typeof payload !== "object" || typeof payload.id !== "string") {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  try {
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication is required" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    return next();
  };
}
