const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  race: {
    type: String,
    required: true,
    enum: ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling']
  },
  class: {
    type: String,
    required: true,
    enum: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 20
  },
  stats: {
    Strength: { type: Number, default: 10, min: 3, max: 20 },
    Dexterity: { type: Number, default: 10, min: 3, max: 20 },
    Constitution: { type: Number, default: 10, min: 3, max: 20 },
    Intelligence: { type: Number, default: 10, min: 3, max: 20 },
    Wisdom: { type: Number, default: 10, min: 3, max: 20 },
    Charisma: { type: Number, default: 10, min: 3, max: 20 }
  },
  hitPoints: {
    type: Number,
    required: true,
    min: 1
  },
  armorClass: {
    type: Number,
    default: 10,
    min: 1
  },
  proficiencyBonus: {
    type: Number,
    default: 2,
    min: 2,
    max: 6
  },
  backstory: {
    type: String,
    maxlength: 2000,
    default: ''
  },
  notes: {
    type: String,
    maxlength: 2000,
    default: ''
  },
  userId: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
characterSchema.index({ userId: 1, createdAt: -1 });

// Virtual for ability score modifiers
characterSchema.virtual('modifiers').get(function() {
  const modifiers = {};
  for (const [stat, score] of Object.entries(this.stats)) {
    modifiers[stat] = Math.floor((score - 10) / 2);
  }
  return modifiers;
});

// Ensure virtual fields are included in JSON output
characterSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Character', characterSchema);