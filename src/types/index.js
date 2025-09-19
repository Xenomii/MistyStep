// Character types
export const RACES = [
  'Human',
  'Elf',
  'Dwarf',
  'Halfling',
  'Dragonborn',
  'Gnome',
  'Half-Elf',
  'Half-Orc',
  'Tiefling',
];

export const CLASSES = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard',
];

export const STATS = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
];

// Default character structure
export const DEFAULT_CHARACTER = {
  id: null,
  name: '',
  race: '',
  class: '',
  level: 1,
  stats: {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  },
  hitPoints: 0,
  armorClass: 10,
  proficiencyBonus: 2,
  backstory: '',
  notes: '',
  createdAt: null,
  updatedAt: null,
};

// Note types for campaign notebook
export const NOTE_TAGS = [
  'Location',
  'NPC',
  'Quest',
  'Combat',
  'Lore',
  'Magic Item',
  'Important',
];

// Content types for library
export const CONTENT_TYPES = [
  'Spell',
  'Item',
  'NPC',
  'Monster',
  'Location',
  'Quest',
];