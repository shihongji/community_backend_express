import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
  getPostBySlug,
  toggleVisibility,
  toggleDeletion,
  toggleSticky,
} from '../controllers/post.js';

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: API to manage posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Posts]
 *     summary: Fetch all posts with pagination and filters
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: The page number
 *       - in: query 
 *         name: limit
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - in: query 
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: The property to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: The sorting order
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: filter criteria for posts
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Failed
 * 
 *   post:
 *     tags: [Posts]
 *     summary: Creates a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '201':
 *         description: Success
 *       '400':
 *         description: Failed
 *
 * /posts/id/{postId}:
 *   get:
 *     tags: [Posts]
 *     summary: Fetch a post by id
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to fetch
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Failed
 * 
 * /posts/{postId}:
 *   put:
 *     tags: [Posts]
 *     summary: Update a post by id
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Failed
 * 
 *   delete:
 *     tags: [Posts]
 *     summary: Delete a post by id
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to delete
 *     responses:
 *       '204':
 *         description: Success
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Failed
 * 
 * /posts/{postId}/{action}:
 *   patch:
 *     tags: [Posts]
 *     summary: Toggle a given action on a post by id. Actions are 'visibility', 'deletion', 'sticky'.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *       - in: path
 *         name: action
 *         schema:
 *           type: string
 *         required: true
 *         description: The action to toggle
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Failed
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *         - text
 *         - categoryId
 *         - is_deleted
 *       properties:
 *         title:
 *           type: string
 *           description: The post's title.
 *         userId:
 *           type: ObjectId
 *           description: The post's author.
 *         slug:
 *           type: string
 *           description: The post's readable url.
 *         text:
 *           type: string
 *           description: The post's text.
 *         categoryId:
 *           type: string
 *           description: The post's category.
 *         commentIds:
 *           type: array
 *           items: 
 *             type: ObjectId
 *           description: The post's comments.
 *         is_deleted:
 *           type: boolean
 *           description: Whether the post is deleted. (by user)
 *         is_visible:
 *           type: boolean
 *           description: Whether the post is visible. (admin)
 *         is_sticky:
 *           type: boolean
 *           description: Whether the post is sticky. (admin)
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The post's tags.
 *         created:
 *           type: Date 
 *           description: The post's creation date.
 *         updated:
 *           type: Date 
 *           description: The post's last update date.
 */
router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/id/:postId', auth, getPostById);
router.put('/:postId', updatePostById);
router.delete('/:postId', deletePostById);
router.get('/:slug', getPostBySlug);
router.patch('/:postId/visibility', toggleVisibility);
router.patch('/:postId/deletion', toggleDeletion);
router.patch('/:postId/sticky', toggleSticky);

export default router;
