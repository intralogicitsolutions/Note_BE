import bcrypt from "bcrypt";

const saltRounds = 10;

// Hash Password
async function hashPassword(password: string) {
  const hashedpassword = await bcrypt.hash(password, saltRounds);
  return hashedpassword;
}

// Compare Password
async function comparePassword(plainpassword: string, hashedpassword: string) {
  const isMatch = await bcrypt.compare(plainpassword, hashedpassword);
  return isMatch;
}

export { hashPassword, comparePassword };
