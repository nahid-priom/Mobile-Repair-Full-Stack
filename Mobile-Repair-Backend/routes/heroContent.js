const express = require('express');
const router = express.Router();
const HeroContent = require('../models/HeroContent');

// @route   GET /api/hero-content
// @desc    Get hero section content
// @access  Public
router.get('/', async (req, res) => {
  try {
    const heroContent = await HeroContent.findOne();
    res.json(heroContent);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/hero-content
// @desc    Update hero section content
// @access  Private
router.put('/', async (req, res) => {
  const { title, subtitle, description, imageUrl } = req.body;

  try {
    let heroContent = await HeroContent.findOne();

    if (heroContent) {
      // Update existing content
      heroContent.title = title;
      heroContent.subtitle = subtitle;
      heroContent.description = description;
      heroContent.imageUrl = imageUrl;
    } else {
      // Create new content if not existing
      heroContent = new HeroContent({ title, subtitle, description, imageUrl });
    }

    await heroContent.save();
    res.json(heroContent);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
