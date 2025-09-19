const express = require('express');
const Campaign = require('../models/Campaign');
const router = express.Router();

// GET /api/campaigns
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const campaigns = await Campaign.find({ userId }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/campaigns
router.post('/', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const campaign = new Campaign({ ...req.body, userId });
    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/campaigns/:id
router.put('/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const campaign = await Campaign.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/campaigns/:id
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'default-user';
    const campaign = await Campaign.findOneAndDelete({ _id: req.params.id, userId });
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;