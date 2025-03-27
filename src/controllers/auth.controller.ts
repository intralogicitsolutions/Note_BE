import { Response } from "express";
import AuthService from "../services/auth.service";
import { responseData } from "../constants/response";
import { messageConstants } from "../constants/messages";
import CustomError from "../utils/custom_error";

const googleAuthenticate = async (req: any, res: Response) => {
  try {
    const token = await AuthService.googleAuthenticate(req.userId);
    res.redirect(`myapp://oauth?token=${token}`);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }

  // try {
  //   const token = await AuthService.googleAuthenticate(req.userId);

  //   // Instead of redirecting directly to `myapp://oauth`, use a web URL
  //   res.redirect(`https://your-frontend.com/oauth?token=${token}`);
  // } catch (error) {
  //   res.status(500).json({ message: "Authentication failed", error: error.message });
  // }

}

const signUp = async (req: any, res: Response) => {
  try {
    if(!req?.body?.email) throw new CustomError('Email is required', 400);
    if(!req?.body?.password) throw new CustomError('Password is required', 400);

    const data = await AuthService.signUp(req?.body);
    responseData.success(res, data, messageConstants.USER_CREATED);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

const signIn = async (req: any, res: Response) => {
  try {
    if(!req?.body?.email) throw new CustomError('Email is required', 400);
    if(!req?.body?.password) throw new CustomError('Password is required', 400);
    
    const data = await AuthService.signIn(req?.body);
    responseData.success(res, data, messageConstants.LOGGEDIN_SUCCESSFULLY);
  } catch (error: any) {
    responseData.fail(res, error?.message, error?.statusCode);
  }
};

export default { signIn, signUp, googleAuthenticate };
