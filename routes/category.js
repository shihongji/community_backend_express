import express from 'express';
const router = express.Router();
import Category from '../models/Category.js';
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from '../controllers/category.js';

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', updateCategoryById);
router.delete('/:categoryId', deleteCategoryById);

export default router;
