const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const router = express.Router();
const fs = require('fs')





// Check if the uploads folder exists, create it if it doesn't
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
    cb(null, isValid);
  },
}).single('image');

// Create Post with Image
router.post('/', upload, async (req, res) => {
  const { title, description, content, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const imagePath = req.file ? `uploads/${req.file.filename}` : null;

  try {
    const post = new Post({
      title,
      description,
      content,
      image: imagePath,
      userId,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});


router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});

router.get('/userId', async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments({ userId }); 
    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id; 

    
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    console.error(`Error fetching post by ID: ${err.message}`);
    res.status(500).json({ success: false, message: 'Error fetching post', error: err.message });
  }
});







module.exports = router;

