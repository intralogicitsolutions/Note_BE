import { Response } from "express";
import { messageConstants } from "./messages";

export const responseData = {
  success: function (res: Response, body: any, msg: string) {
    res.status(200).json({
      success: 1,
      code: 200,
      msg: msg,
      body: body,
    });
    return false;
  },
  fail: function (res: Response, msg: string | null, status = 500) {
    res.status(status).json({
      success: 0,
      code: status,
      msg: msg,
      body: {},
    });
    return false;
  },
  unauthorized: {
    success: 0,
    code: 401,
    msg: messageConstants.UNAUTHORIZED,
  },
  tokenRequired: {
    success: 0,
    code: 400,
    msg: messageConstants.PROVIDE_TOKEN,
  },
  tokenExpired: {
    success: 0,
    code: 400,
    msg: messageConstants.TOKEN_EXPIRED,
  },
};
