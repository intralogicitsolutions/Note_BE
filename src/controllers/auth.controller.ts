import { Response } from "express";
import AuthService from "../services/auth.service";
import { responseData } from "../constants/response";
import { messageConstants } from "../constants/messages";

const googleAuthenticate = async (req: any, res: Response) => {
  try {
    return await AuthService.googleAuthenticate();
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
}

const signUp = async (req: any, res: Response) => {
  try {
    const data = await AuthService.signUp(req?.body);
    responseData.success(res, data, messageConstants.USER_CREATED);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

const signIn = async (req: any, res: Response) => {
  try {
    const data = await AuthService.signIn(req?.body);
    responseData.success(res, data, messageConstants.LOGGEDIN_SUCCESSFULLY);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

export default { signIn, signUp, googleAuthenticate };
