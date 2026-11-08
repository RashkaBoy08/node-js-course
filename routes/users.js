import express from "express";
import { authorize, protect } from "../middlewares/auth.js";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/", getUsers);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
