import { Note } from "../models/note.model.js";

export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { userId } = req;

  if (!title || !content) {
    return res
      .status(422)
      .json({ error: true, message: "Please add all the fields" });
  }
  try {
    const notes = new Note({
      title,
      content,
      tags: tags || [],
      userId,
    });
    await notes.save();
    res
      .status(201)
      .json({ success: true, message: "Note created successfully", notes });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
export const updateNote = async (req, res) => {
  const { id } = req.params;

  const { title, content, tags, isPinned } = req.body;
  const { userId } = req;

  if (!title && !content && !tags) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  const notes = await Note.findOne({ _id: id, userId });

  if (!notes) {
    return res.status(404).json({ error: true, message: "Note not found" });
  }
  notes.title = title || notes.title;
  notes.content = content || notes.content;
  notes.tags = tags || notes.tags;
  notes.isPinned = isPinned || notes.isPinned;

  await notes.save();

  res
    .status(200)
    .json({ success: true, message: "Note updated successfully", notes });

  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    throw error;
  }
};
export const getNotes = async (req, res) => {
  const { userId } = req;

  try {
    const notes = await Note.find({ userId: userId });

    if (!notes) {
      return res.status(404).json({ error: true, message: "Notes not found" });
    }

    res
      .status(200)
      .json({ success: true, notes, message: "Notes fetched successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    throw error;
  }
};
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const notes = await Note.findOne({ _id: id, userId });
    if (!notes) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    await notes.deleteOne({
      _id: id,
      userId,
    });
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    throw error;
  }
};
export const updateNotePinned = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const { isPinned } = req.body;

  try {
    const notes = await Note.findOne({ _id: id, userId });
    if (!notes) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    notes.isPinned = isPinned || false;

    await notes.save();
    res.status(200).json({
      success: true,
      message: "Note pinned status updated successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    throw error;
  }
};
