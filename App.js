import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import CharacterCreationNavigator from './src/screens/CharacterCreation/CharacterCreationNavigator';
import CampaignNotebookNavigator from './src/screens/CampaignNotebook/CampaignNotebookNavigator';
import ContentLibraryNavigator from './src/screens/ContentLibrary/ContentLibraryNavigator';

const Tab = createBottomTabNavigator();

// Custom theme for the app
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750a4',
    primaryContainer: '#eaddff',
    secondary: '#625b71',
    secondaryContainer: '#e8def8',
    surface: '#fffbff',
    surfaceVariant: '#e7e0ec',
    background: '#fffbff',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Characters') {
                  iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Campaign') {
                  iconName = focused ? 'book' : 'book-outline';
                } else if (route.name === 'Library') {
                  iconName = focused ? 'library' : 'library-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: 'gray',
              headerStyle: {
                backgroundColor: theme.colors.surface,
              },
              headerTintColor: theme.colors.onSurface,
            })}
          >
            <Tab.Screen
              name="Characters"
              component={CharacterCreationNavigator}
              options={{
                title: 'Character Creation',
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Campaign"
              component={CampaignNotebookNavigator}
              options={{
                title: 'Campaign Notes',
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Library"
              component={ContentLibraryNavigator}
              options={{
                title: 'Content Library',
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
