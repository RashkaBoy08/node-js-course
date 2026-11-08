import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import uploadRoutes from "./routes/upload.js";
import tasksRoutes from "./routes/tasks.js";

import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandle } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5873"],
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}

// app.use(morgan("common")); // built-in logger middleware
// app.use(logger); // custom logger middleware
app.use(helmet());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// connecting to mongoDB
mongoose
  .connect(
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_URL_DEV
      : process.env.MONGO_URI_PR,
  )
  //Check is connect or not
  .then(() => console.log("✅ MongoDB connected locally"))
  .catch((err) => console.error("❌ Connection error:", err));

//routes middleware & diwaangelinta routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/upload", uploadRoutes);
app.use("/tasks", tasksRoutes);
// route middleware for handling 404 errors
app.use(notFound);

//last middleware route
app.use(errorHandle);

//start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
