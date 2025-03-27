import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./config/passport";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/auth.route";
import noteRoutes from "./routes/note.route";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "your_secret_key", // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Database connection failed", err));
