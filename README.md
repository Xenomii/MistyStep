# 🎲 Misty Step - TTRPG Companion App

A comprehensive React Native mobile application for tabletop RPG players and dungeon masters, featuring AI-enhanced character creation, campaign management, and content library functionality.

## ✨ Features

### 1. 🧙‍♂️ Character Creation Wizard (AI-Enhanced)
- **Multi-step character creation** with guided wizard interface
- **AI-powered character generation** for names, backstories, and stat suggestions
- **D&D 5e compatible** races, classes, and ability scores
- **Automatic calculations** for HP, AC, and modifiers
- **Exportable character sheets** (coming soon)
- **Full CRUD operations** with local storage

### 2. 📚 Campaign Notebook
- **Rich note-taking** with tagging system (Location, NPC, Quest, etc.)
- **AI quest generator** with customizable parameters
- **Campaign timeline** and session tracking (coming soon)
- **Advanced search and filtering** by tags and content
- **Campaign management** with multiple campaign support

### 3. 🗂️ Content Library (User-Contributed + AI Balanced)
- **Upload custom content** (spells, items, NPCs, monsters)
- **AI balance analysis** with detailed feedback and suggestions
- **Content categorization** and search functionality
- **Community-style content** management
- **Power level assessment** and balance scoring

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- MongoDB (for backend)

### Frontend Setup
```bash
# Navigate to project root
cd MistyStep

# Install dependencies
npm install

# Start Expo development server
npm start

# Or run on specific platforms
npm run android  # Android
npm run ios      # iOS (macOS only)
npm run web      # Web browser
```

### Backend Setup (Optional)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your configuration
# Start MongoDB service on your system

# Run development server
npm run dev

# Or production server
npm start
```

## 📱 App Structure

```
MistyStep/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components
│   │   ├── forms/          # Form-specific components
│   │   └── lists/          # List components
│   ├── screens/            # App screens
│   │   ├── CharacterCreation/
│   │   │   ├── CharacterListScreen.js
│   │   │   ├── CharacterWizardScreen.js
│   │   │   └── CharacterDetailScreen.js
│   │   ├── CampaignNotebook/
│   │   │   ├── CampaignListScreen.js
│   │   │   ├── NotebookScreen.js
│   │   │   ├── NoteDetailScreen.js
│   │   │   ├── TimelineScreen.js
│   │   │   └── QuestGeneratorScreen.js
│   │   └── ContentLibrary/
│   │       ├── ContentLibraryScreen.js
│   │       ├── ContentDetailScreen.js
│   │       ├── ContentUploadScreen.js
│   │       └── AIBalanceScreen.js
│   ├── services/           # API services
│   ├── store/              # Zustand state management
│   ├── types/              # Type definitions and constants
│   └── utils/              # Utility functions
├── backend/                # Express.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── services/           # Business logic
│   └── config/             # Configuration files
└── assets/                 # Images, icons, fonts
```

## 🛠️ Technology Stack

### Frontend
- **React Native** with Expo
- **React Navigation 6** for navigation
- **React Native Paper** for Material Design components
- **Zustand** for state management
- **React Hook Form** with Yup validation
- **Expo Vector Icons** for iconography
- **AsyncStorage** for local data persistence

### Backend
- **Express.js** REST API
- **MongoDB** with Mongoose ODM
- **JWT** authentication (ready for implementation)
- **Helmet** for security headers
- **Morgan** for logging
- **CORS** for cross-origin requests
- **Rate limiting** middleware

### AI Integration Ready
- OpenAI API integration structure
- Placeholder AI services for:
  - Character generation
  - Quest creation
  - Content balance analysis

## 🎮 User Experience

### Character Creation Flow
1. **Basic Info** - Name and AI generation option
2. **Race & Class** - Interactive chip selection
3. **Ability Scores** - Manual input or dice rolling
4. **Background** - Backstory and additional notes

### Campaign Management
1. **Campaign Selection** - Multiple campaign support
2. **Note Organization** - Tag-based filtering system
3. **Search Functionality** - Full-text search across notes
4. **AI Assistance** - Quest generation with customizable parameters

### Content Library
1. **Content Upload** - Simple form-based upload
2. **Categorization** - Type-based organization
3. **AI Analysis** - Balance checking with detailed feedback
4. **Search & Filter** - Advanced filtering by type and content

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Backend configuration
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mistystep
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
```

### Customization
- Modify `src/types/index.js` for custom races, classes, and content types
- Update theme colors in `App.js`
- Extend AI functionality in `backend/routes/ai.js`

## 📦 Available Scripts

### Frontend
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run test suite

## 🤖 AI Features

### Character Generation
- AI suggests character names based on race/class combinations
- Generates appropriate backstories with campaign hooks
- Provides balanced stat distributions

### Quest Generation
- Creates custom quests based on:
  - Quest type (rescue, investigation, etc.)
  - Setting preferences
  - Party level considerations
- Includes objectives and reward suggestions

### Content Balance Analysis
- Analyzes uploaded content for game balance
- Provides power level ratings (1-10 scale)
- Suggests modifications for better balance
- Considers damage output, utility, cost, and availability

## 🗄️ Data Storage

### Local Storage (AsyncStorage)
- Character data
- Campaign information
- Notes and content
- User preferences

### Backend Database (MongoDB)
- User accounts and authentication
- Shared content library
- Campaign collaboration features
- AI analysis history

## 🔐 Security

- Helmet.js for security headers
- CORS configuration
- Rate limiting middleware
- Input validation with Joi
- MongoDB injection prevention
- JWT token authentication structure

## 📱 Platform Support

- ✅ **Android** - Full support with Expo
- ✅ **iOS** - Full support with Expo  
- ✅ **Web** - React Native Web support
- 🔄 **Desktop** - Possible with Electron (future)

## 🚧 Development Roadmap

### Phase 1 (Current)
- [x] Character Creation Wizard
- [x] Basic Campaign Notebook
- [x] Content Library Framework
- [x] Backend API Structure

### Phase 2 (Next)
- [ ] User authentication
- [ ] Cloud data synchronization  
- [ ] Enhanced AI features
- [ ] Character sheet export (PDF)

### Phase 3 (Future)
- [ ] Real-time campaign collaboration
- [ ] Advanced timeline features
- [ ] Community content sharing
- [ ] Offline mode improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- D&D 5e System Reference Document (SRD)
- React Native and Expo communities
- Open source contributors and maintainers
- TTRPG community for inspiration and feedback

---

**Happy Adventures!** 🎲✨