import express from 'express';
const router = express.Router();
import {
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId,
  createCommentByPostId,
} from '../controllers/comment.js';

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: API to manage comments
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     tags: [Comments]
 *     summary: Fetch all comments
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Failed
 * 
 *   post:
 *     tags: [Comments]
 *     summary: Creates a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *         description: Failed
 *
 * /comments/{commentId}:
 *   get:
 *     tags: [Comments]
 *     summary: Fetch a comment by id
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to fetch
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Failed
 * 
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment by id
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Comment not found
 *       '400':
 *         description: Failed
 * 
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment by id
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment to delete
 *     responses:
 *       '204':
 *         description: Success
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Failed
 * 
 * /comments/commentsByPost/{postId}:
 *   get:
 *     tags: [Comments]
 *     summary: Fetch comments by post ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to fetch the comments
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Failed
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - userId
 *         - postId
 *       properties:
 *         text:
 *           type: string
 *           description: The comment's text.
 *         userId:
 *           type: string
 *           description: The comment's author ID.
 *         postId:
 *           type: string
 *           description: The ID of the post on which the comment is made.
 */
router.get('/', getAllComments);
router.post('/', createCommentByPostId);
router.get('/:commentId', getCommentById);
router.put('/:commentId', updateCommentById);
router.delete('/:commentId', deleteCommentById);
router.get('/commentsByPost/:postId', getCommentsByPostId);

export default router;
