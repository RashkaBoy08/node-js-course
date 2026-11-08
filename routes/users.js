import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
