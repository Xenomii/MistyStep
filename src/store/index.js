import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_CHARACTER } from '../types';

const useAppStore = create((set, get) => ({
  // Characters state
  characters: [],
  currentCharacter: null,
  
  // Campaign notebook state
  campaigns: [],
  currentCampaign: null,
  notes: [],
  
  // Content library state
  contentItems: [],
  
  // Loading states
  loading: false,
  
  // Character actions
  addCharacter: (character) => {
    const newCharacter = {
      ...character,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      characters: [...state.characters, newCharacter],
    }));
    
    // Save to AsyncStorage
    get().saveCharactersToStorage();
    return newCharacter;
  },
  
  updateCharacter: (characterId, updates) => {
    set((state) => ({
      characters: state.characters.map((char) =>
        char.id === characterId
          ? { ...char, ...updates, updatedAt: new Date().toISOString() }
          : char
      ),
    }));
    
    get().saveCharactersToStorage();
  },
  
  deleteCharacter: (characterId) => {
    set((state) => ({
      characters: state.characters.filter((char) => char.id !== characterId),
      currentCharacter: state.currentCharacter?.id === characterId ? null : state.currentCharacter,
    }));
    
    get().saveCharactersToStorage();
  },
  
  setCurrentCharacter: (character) => set({ currentCharacter: character }),
  
  // Campaign actions
  addCampaign: (campaign) => {
    const newCampaign = {
      ...campaign,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      campaigns: [...state.campaigns, newCampaign],
    }));
    
    get().saveCampaignsToStorage();
    return newCampaign;
  },
  
  setCurrentCampaign: (campaign) => set({ currentCampaign: campaign }),
  
  addNote: (note) => {
    const newNote = {
      ...note,
      id: uuidv4(),
      campaignId: get().currentCampaign?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      notes: [...state.notes, newNote],
    }));
    
    get().saveNotesToStorage();
    return newNote;
  },
  
  updateNote: (noteId, updates) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === noteId
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      ),
    }));
    
    get().saveNotesToStorage();
  },
  
  deleteNote: (noteId) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== noteId),
    }));
    
    get().saveNotesToStorage();
  },
  
  // Content library actions
  addContentItem: (item) => {
    const newItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      contentItems: [...state.contentItems, newItem],
    }));
    
    get().saveContentToStorage();
    return newItem;
  },
  
  updateContentItem: (itemId, updates) => {
    set((state) => ({
      contentItems: state.contentItems.map((item) =>
        item.id === itemId
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      ),
    }));
    
    get().saveContentToStorage();
  },
  
  deleteContentItem: (itemId) => {
    set((state) => ({
      contentItems: state.contentItems.filter((item) => item.id !== itemId),
    }));
    
    get().saveContentToStorage();
  },
  
  // Storage actions
  saveCharactersToStorage: async () => {
    try {
      const characters = get().characters;
      await AsyncStorage.setItem('characters', JSON.stringify(characters));
    } catch (error) {
      console.error('Error saving characters:', error);
    }
  },
  
  loadCharactersFromStorage: async () => {
    try {
      const charactersData = await AsyncStorage.getItem('characters');
      if (charactersData) {
        set({ characters: JSON.parse(charactersData) });
      }
    } catch (error) {
      console.error('Error loading characters:', error);
    }
  },
  
  saveCampaignsToStorage: async () => {
    try {
      const campaigns = get().campaigns;
      await AsyncStorage.setItem('campaigns', JSON.stringify(campaigns));
    } catch (error) {
      console.error('Error saving campaigns:', error);
    }
  },
  
  loadCampaignsFromStorage: async () => {
    try {
      const campaignsData = await AsyncStorage.getItem('campaigns');
      if (campaignsData) {
        set({ campaigns: JSON.parse(campaignsData) });
      }
    } catch (error) {
      console.error('Error loading campaigns:', error);
    }
  },
  
  saveNotesToStorage: async () => {
    try {
      const notes = get().notes;
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  },
  
  loadNotesFromStorage: async () => {
    try {
      const notesData = await AsyncStorage.getItem('notes');
      if (notesData) {
        set({ notes: JSON.parse(notesData) });
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  },
  
  saveContentToStorage: async () => {
    try {
      const contentItems = get().contentItems;
      await AsyncStorage.setItem('contentItems', JSON.stringify(contentItems));
    } catch (error) {
      console.error('Error saving content:', error);
    }
  },
  
  loadContentFromStorage: async () => {
    try {
      const contentData = await AsyncStorage.getItem('contentItems');
      if (contentData) {
        set({ contentItems: JSON.parse(contentData) });
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  },
  
  // Initialize app data
  initializeApp: async () => {
    set({ loading: true });
    await Promise.all([
      get().loadCharactersFromStorage(),
      get().loadCampaignsFromStorage(),
      get().loadNotesFromStorage(),
      get().loadContentFromStorage(),
    ]);
    set({ loading: false });
  },
}));

export default useAppStore;