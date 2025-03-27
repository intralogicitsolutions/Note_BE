import express from "express";
import AuthController from "../controllers/auth.controller";
import passport from "passport";
import { generateJWT } from "../utils/generateJWT";

const router = express.Router();

router.get("/google", AuthController.googleAuthenticate);
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Generate a JWT token (optional)
//     const token = generateJWT(req.userId);

//     // Redirect back to React Native app with token
//     res.redirect(`myapp://oauth?token=${token}`);
//   }
// );
router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect("/");
  });
});

export default router;
