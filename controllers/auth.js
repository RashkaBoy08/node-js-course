import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

function isValidCredentials(name, email, password) {
  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof password === "string" &&
    Boolean(name.trim()) &&
    Boolean(email.trim()) &&
    Boolean(password)
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || "user",
  };
}

export async function register(req, res, next) {
  const { name, email, password } = req.body ?? {};

  if (!isValidCredentials(name, email, password)) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    return res
      .status(201)
      .json({ token: generateToken(user._id), user: publicUser(user) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    return next(error);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body ?? {};

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select(
      "+password",
    );
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res
      .status(200)
      .json({ token: generateToken(user._id), user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
}

export function getProfile(req, res) {
  return res.json({ user: publicUser(req.user) });
}
