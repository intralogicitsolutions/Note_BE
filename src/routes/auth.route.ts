import express from "express";
import AuthController from "../controllers/auth.controller";
import passport from "../config/passport";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), AuthController.googleAuthenticate);
router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect("/");
  });
});

export default router;
