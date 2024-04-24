import express from 'express';
import userRoutes from './user/index.js';
import imageRoutes from './image/image.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/upload', imageRoutes);

export default router;
