import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    label: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.models.Notes || mongoose.model("Notes", NotesSchema);

export default Notes;
