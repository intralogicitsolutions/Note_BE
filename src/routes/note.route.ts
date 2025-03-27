import express from "express";
import NoteController from "../controllers/note.controller";
import { verifyToken } from "../middlewares/verifytoken";

const router = express.Router();

router.get("/", verifyToken, NoteController.getNotes);
router.post("/", verifyToken, NoteController.createNote);
router.put("/:id", verifyToken, NoteController.updateNote);
router.delete("/:id", verifyToken, NoteController.deleteNote);

export default router;
