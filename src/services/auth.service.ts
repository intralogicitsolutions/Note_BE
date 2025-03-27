import passport from "../config/passport";
import User from "../entities/User";
import CustomError from "../utils/custom_error";
import { comparePassword, hashPassword } from "../utils/encrypt_decrypt";
import { generateJWT } from "../utils/generateJWT";

const googleAuthenticate = async () => {
  return passport.authenticate("google", { scope: ["profile", "email"] });
};

const signUp = async (body: any) => {
  try {
    const { email, password } = body;
    const result = await User.findOne({ where: { email } });
    if (result) {
      throw new CustomError("User already exists", 400);
    } else {
      const encryptedPassword = await hashPassword(password);
      const user = new User();
      user.email = email;
      user.password = encryptedPassword;
      return await user.save();
    }
  } catch (error) {
    throw error;
  }
};

const signIn = async (body: any) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new CustomError("User not found", 404);
    } else {
      const isMatch: boolean = await comparePassword(password, user?.password);
      if (!isMatch) {
        throw new CustomError("Invalid Password", 400);
      } else {
        const token = await generateJWT(user.id);
        user.token = token;
        const response = await user.save();
        const { password, ...userDetails } = response;
        return userDetails;
      }
    }
  } catch (error) {
    throw error;
  }
};

export default { signIn, signUp, googleAuthenticate };
