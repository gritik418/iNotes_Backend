import Notes from "../models/notesModel.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user.id });

    return res.status(200).json({
      success: true,
      status: 200,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 400,
      message: "Server Error.",
    });
  }
};

export const addNote = async (req, res) => {
  try {
    const data = req.body;

    if (!data.content || data.content === "") {
      return res.status(400).json({
        success: false,
        status: 400,
        errors: { content: "Content is required." },
      });
    }

    const note = new Note({
      userId: req.user.id,
      title: data.title || "",
      label: data.label || "",
      content: data.content,
    });

    await note.save();

    return res.status(201).json({
      success: true,
      status: 200,
      message: "Note added.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 400,
      message: "Server Error.",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Notes.findByIdAndDelete(noteId);

    return res.status(200).json({
      success: true,
      status: 200,
      deletedNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 400,
      message: "Server Error.",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const data = req.body;
    const noteId = req.params.id;

    if (!data.content || data.content === "") {
      return res.status(400).json({
        success: false,
        status: 400,
        errors: { content: "Content is required." },
      });
    }

    const updatedNote = await Notes.findByIdAndUpdate(noteId, {
      $set: {
        title: data.title || "",
        label: data.label || "",
        content: data.content,
      },
    });

    return res.status(200).json({
      success: true,
      status: 200,
      updateNote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 400,
      message: "Server Error.",
    });
  }
};
