import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", authenticate, getNotes);

router.post("/", authenticate, addNote);

router.delete("/:id", authenticate, deleteNote);

router.put("/:id", authenticate, updateNote);

export default router;
