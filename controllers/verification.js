import VerificationCode from "../models/verification.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail, sendResetPasswordEmail } from "../utils/mailer.js";
import bcrypt from "bcrypt";

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  // Check if email already exists
  let userByEmail = await User.findOne({ email });
  if (userByEmail) {
    res.status(400).json({ message: `${email} is already registered` });
  } else {
    // Generate verification code
    const code = Math.floor(1000000 * Math.random()).toString();

    // Save verification code to database
    const verificationCode = new VerificationCode({
      email,
      code,
    });
    await verificationCode.save();

    // Send verification code to user's email
    sendVerificationEmail(email, code);

    res.status(200).json({ message: `Verification code sent to ${email}` });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  // Check the verificationCode in database
  const verificationCode = await VerificationCode.findOne({ email, code });

  if (verificationCode) {
    res.status(200).json({ message: "Email verified" });
  } else {
    res.status(400).json({ message: "Invalid verification code" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Check if email exists
  let userByEmail = await User.findOne({ email });
  if (!userByEmail) {
    res.status(400).json({ message: `${email} is not registered` });
  } else {
    // Generate token
    // Send token to user's email
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    // save token to database
    const verificationCode = new VerificationCode({
      email,
      code: token,
    });
    await verificationCode.save();

    // Send verification code to user's email
    sendResetPasswordEmail(email, token);

    res.status(200).json({ message: `Reset password link sent to ${email}` });
  }
};

export const resetPassword = async (req, res) => {
  // Check if token exists
  const { token, newPassword } = req.body;
  // Check if token is valid
  // Check if token is expired
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const { email } = decodedToken;
  // Check if email exists
  let emailToken = await VerificationCode.findOne({ email, code: token });
  if (!emailToken) {
    res.status(400).json({ message: "Invalid token" });
  } else {
    // Update password
    let user = await User.findOne({ email });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);


    user.password = hashedPassword;
    // Delete token from database
    await VerificationCode.deleteOne({ code: token });
    await user.save();
    res.status(200).json({ message: "Password updated" });
  }
};
