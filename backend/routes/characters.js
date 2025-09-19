const express = require('express');
const Character = require('../models/Character');
const router = express.Router();

// GET /api/characters - Get all characters for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user'; // In production, extract from JWT
    const characters = await Character.find({ userId }).sort({ createdAt: -1 });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/characters/:id - Get a specific character
router.get('/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const character = await Character.findOne({ _id: req.params.id, userId });
    
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/characters - Create a new character
router.post('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const character = new Character({
      ...req.body,
      userId
    });
    
    const savedCharacter = await character.save();
    res.status(201).json(savedCharacter);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/characters/:id - Update a character
router.put('/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const character = await Character.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    res.json(character);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/characters/:id - Delete a character
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const character = await Character.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;