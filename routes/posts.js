import express from "express";
import { getPostsInfo, getPosts } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostsInfo);

export default router;
