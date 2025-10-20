const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  sessionCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying
campaignSchema.index({ userId: 1, isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Campaign', campaignSchema);