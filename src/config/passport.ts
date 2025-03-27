import passport from "passport";
import User from "../entities/User";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findOne({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_REDIRECT_URI, // Change this
//     },
//     async (accessToken: any, refreshToken: any, profile: any, done: any) => {
//       try {
//         let user = await User.findOne({ where: { googleId: profile.id } });

//         if (!user) {
//           user = await User.create({
//             googleId: profile.id,
//             email: profile.emails?.[0].value,
//           });
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

export default passport;
