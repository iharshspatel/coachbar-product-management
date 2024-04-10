import express from 'express';
import {createProduct, deleteProduct, getAllProducts, getProduct, updateProduct} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/authorizeMiddleware.js';

const router = express.Router();

router.post('/create', protect, createProduct);
router.get("/all" , protect, getAllProducts);
router.get("/:id" , protect, getProduct);
router.put("/:id" , protect, updateProduct);
router.delete("/:id" , protect, deleteProduct);
export default router;
