const express = require('express');
const router = express.Router();

// Placeholder routes for notes API
router.get('/', (req, res) => {
  res.json({ message: 'Notes API - Coming Soon' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create note - Coming Soon' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update note - Coming Soon' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete note - Coming Soon' });
});

module.exports = router;