import express from 'express';
import { sendVerificationCode, verifyEmail, forgotPassword, resetPassword } from '../controllers/verification.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Verification
 *   description: API to manage verification of users
 */

/**
 * @swagger
 * /verification/send-verification-email:
 *   post:
 *     tags: [Verification]
 *     summary: Send a verification code to a user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Verification code sent successfully
 *       '400':
 *         description: Email already registered
 *       '500':
 *         description: Request Failed
 * 
 * /verification/verify-verification-code:
 *   post:
 *     tags: [Verification]
 *     summary: Verify the verification code from a user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Email verified
 *       '400':
 *         description: Invalid verification code
 *       '500':
 *         description: Request Failed
 * 
 * /verification/forgot-password:
 *   post:
 *     tags: [Verification]
 *     summary: Send a forgot password token to a user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reset password link sent
 *       '400':
 *         description: Email not registered
 *       '500':
 *         description: Request Failed
 * 
 * /verification/reset-password:
 *   post:
 *     tags: [Verification]
 *     summary: Verify the token from a user's email and reset password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password updated
 *       '400':
 *         description: Invalid token
 *       '500':
 *         description: Request Failed
 */
router.post('/send-verification-email', sendVerificationCode);
router.post('/verify-verification-code', verifyEmail);
// forgot password
// reset password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
export default router;
