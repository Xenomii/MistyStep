import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterListScreen from './CharacterListScreen';
import CharacterWizardScreen from './CharacterWizardScreen';
import CharacterDetailScreen from './CharacterDetailScreen';

const Stack = createStackNavigator();

const CharacterCreationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6750a4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="CharacterList"
        component={CharacterListScreen}
        options={{
          title: 'My Characters',
        }}
      />
      <Stack.Screen
        name="CharacterWizard"
        component={CharacterWizardScreen}
        options={{
          title: 'Create Character',
        }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{
          title: 'Character Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default CharacterCreationNavigator;