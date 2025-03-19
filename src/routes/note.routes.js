import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  updateNotePinned,
} from "../controllers/note.controller.js";
import { verifyAuth } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-note", verifyAuth, createNote);
router.put("/update-note/:id", verifyAuth, updateNote);
router.get("/get-notes", verifyAuth, getNotes);
router.delete("/delete-note/:id", verifyAuth, deleteNote);
router.put("/update-note-pinned/:id", verifyAuth, updateNotePinned);
export default router;
