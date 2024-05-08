import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"

import contactsRouter from "./routes/contactsRouter.js";
import connectDB from "./server.js";
import { router as usersRouter } from "./routes/authRouter.js";
import { router as viewRouter } from "./routes/viewRouter.js";

dotenv.config();

const app = express();

connectDB()

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);
app.use(express.static("public"));
app.use("/", viewRouter);

// setup PUG template engine
app.set("view engine", "pug");
app.set("views", "views")

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});

export default app;
