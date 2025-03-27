import { Response } from "express";
import NoteService from "../services/note.service";
import { responseData } from "../constants/response";
import { messageConstants } from "../constants/messages";

const getNotes = async (req: any, res: Response) => {
  try {
    const userId: number = req?.userId;
    const notes = await NoteService.getNotes(userId);
    responseData.success(res, notes, messageConstants.NOTES_FETCHED);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

const createNote = async (req: any, res: Response) => {
  try {
    const userId = req?.userId;
    req.body.userId = userId;
    const note = await NoteService.createNote(req?.body);
    responseData.success(res, note, messageConstants.NOTE_CREATED);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

const updateNote = async (req: any, res: Response) => {
  try {
    const userId = req?.userId;
    const noteId = req?.params?.id;

    req.body.userId = +userId;
    req.body.id = +noteId;

    const note = await NoteService.updateNote(req?.body);
    responseData.success(res, note, messageConstants.NOTE_UPDATED);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

const deleteNote = async (req: any, res: Response) => {
  try {
    const userId = req?.userId;
    const noteId = req?.params?.id;

    req.body.userId = +userId;
    req.body.id = +noteId;

    const note = await NoteService.deleteNote(req?.body);
    responseData.success(res, note, messageConstants.NOTE_DELETED);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

export default { getNotes, createNote, updateNote, deleteNote };
