import express from "express";
import { getProfile, login, register } from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";
import { validate } from "../middlewares/validateZod.js";
import { createUserSchema } from "../schemas/userSchema.js";

const router = express.Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

export default router;
