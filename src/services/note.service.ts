import Note from "../entities/Note";
import CustomError from "../utils/custom_error";

const getNotes = async (userId: number) => {
  try {
    const notes = await Note.find({
      where: { userId },
    });
    return notes;
  } catch (error) {
    throw error;
  }
};

const getNoteById = async (data: any) => {
  try {
    const { id, userId } = data;

    const note = await Note.findOne({ where: { id, userId } });

    if (!note) {
      throw new CustomError("Note not found", 404);
    }
    return note;
  } catch (error) {
    throw error;
  }
};

const createNote = async (data: any) => {
  try {
    const note = await Note.create(data);
    return await note.save();
  } catch (error) {
    throw error;
  }
};

const updateNote = async (data: any) => {
  try {
    const { id, title, body, userId } = data;

    const note = await Note.findOne({ where: { id, userId } });

    if (!note) {
      throw new CustomError("Note not found", 404);
    }

    note.title = title || note.title;
    note.body = body || note.body;

    return await note.save();
  } catch (error) {
    throw error;
  }
};

const deleteNote = async (data: any) => {
  try {
    const { id, userId } = data;

    const note = await Note.findOne({ where: { id, userId } });

    if (!note) {
      throw new CustomError("Note not found", 404);
    }

    await Note.remove(note);
  } catch (error) {
    throw error;
  }
};

export default { getNotes, getNoteById, createNote, updateNote, deleteNote };
