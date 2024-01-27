import auth from "../middleware/auth.js";
import express from "express";
import upload from "../middleware/uploadImage.js";

const router = express.Router();
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  updateUserById,
  uploadAvatar,
} from "../controllers/user.js";
import { refreshToken } from "../controllers/authController.js";

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     description: Retrieve a list of users from the database. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                   username:
 *                     type: string
 *                     description: The user's name.
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                   avatar:
 *                     type: string
 *                     description: The user's avatar.
 *                   bio:
 *                     type: string
 *                     description: The user's bio.
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User is created successfully
 *       '500':
 *         description: Server-side error has occurred
 */

router.post("/register", createUser);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    summary: Get a user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Error occurred
 */
router.get("/:UserId", getUserById, auth);

/**
 * @swagger
 * /users/{userId}:
 *  patch:
 *    summary: Update user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      '400':
 *        description: Error occurred
 */
router.patch("/:UserId", updateUserById);

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    summary: Delete a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user
 *    responses:
 *      '200':
 *        description: User was deleted
 *      '400':
 *        description: Error occurred
 */
router.delete("/:UserId", deleteUserById);

/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: User authentication
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      '400':
 *        description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/refresh:
 *  post:
 *    summary: Refresh authentication token
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refreshToken:
 *                type: string
 *    responses:
 *      '200':
 *        description: Refresh successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      '400':
 *        description: Invalid token
 */
router.post("/refresh", refreshToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - role
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         avatar:
 *           type: string
 *           description: The user's avatar url.
 *         bio:
 *           type: string
 *         role:
 *           type: string
 *         refreshToken:
 *           type: string
 *           description: The user's refresh token.
 */

router.patch("/:userId/upload", upload.single("avatar"), uploadAvatar);

export default router;
