const express = require('express');
const router = express.Router();
const config = require('config');
const mongoose = require('mongoose');
const Blogpost = require('../models/Blogpost');
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token || token == null) {
        return res.status(403);
    }

    jwt.verify(token, config.get('jwtSecret'), (err, user) => {
        if(err) {
            return res.status(403);
        }

        next();
    })

}

  
  // @desc    Create new post
  // @route   POST api/blogposts
  router.post('/', authenticateToken,  async (req, res) => {
    try {
      await Blogpost.create(req.body);
      return res.status(201).json({msg: 'created new post'});
    } catch (err) {
      res.status(500);
    }
  })
  
  // @desc    Show all public blogposts
  // @route   GET api/blogposts/
  router.get('/', authenticateToken, async (req, res) => {
    try {
        const blogposts = await Blogpost.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean();
        return res.status(200).json(blogposts);
    } catch (err) {
      return res.status(500);
    }
  })
  
  // @desc    Show single blogpost
  // @route   GET api/blogposts/blogpost/:userId/:id
  router.get('/blogpost/:userId/:id', authenticateToken, async (req, res) => {
    try {
      const blogpost = await Blogpost.findById(req.params.id).populate('user').lean()
      
      if (!blogpost) {
        return res.status(404);
      }
      if (blogpost.user._id != req.params.userId && blogpost.status === 'private') {
        return res.status(401);
      } else {
        return res.status(200).json(blogpost);
      }
    } catch (err) {
        return res.status(500);
    }
  })

// @desc    Edit blogpost
// @route   GET api/blogposts/edit/:userId/:id
router.get('/edit/:userId/:id', authenticateToken,  async (req, res) => {
    try {
      let blogpost = await Blogpost.findOne({
        _id: req.params.id,
      }).lean()
  
      if (!blogpost) {
        return res.status(404);
      }
  
      if (blogpost.user._id != req.params.userId) {
        return res.status(401);
      } else {
        return res.status(200).json(blogpost);
      }
    } catch (err) {
        return res.status(500);
    }
  })

// @desc    Update blogpost
// @route   PUT api/blogposts/:id
router.put('/:id', authenticateToken,  async (req, res) => {
    try {
      let blogpost = await Blogpost.findById(req.params.id).lean()
  
      if (!blogpost) {
        return res.status(404);
      }
      
      if (blogpost.user != req.body.user) {
        return res.status(404);
      } else {
        await Blogpost.findOneAndUpdate({ _id: req.params.id }, req.body, {
          runValidators: true,
        })
  
        return res.status(201).json({msg: 'updated'});
      }
    } catch (err) {
        res.status(500);
    }
  })

// @desc    Delete blogpost
// @route   DELETE api/blogposts/:userID/:id
router.delete('/:userId/:id', authenticateToken, async (req, res) => {
    try {
      let blogpost = await Blogpost.findById(req.params.id).lean()
  
      if (!blogpost) {
        return res.status(404);
      }
  
      if (blogpost.user != req.params.userId) {
        return res.status(404);
      } else {
        await Blogpost.remove({ _id: req.params.id })
        return res.status(201);
      }
    } catch (err) {
        return res.status(500);
    }
  })

// @desc    User blogposts
// @route   GET /blogposts/user/:userId
router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
      const blogposts = await Blogpost.find({
        user: req.params.userId,
      })
        .lean()
  
      return res.status(200).json(blogposts);
    } catch (err) {
      res.status(500);
    }
  })


module.exports = router;