import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CampaignListScreen from './CampaignListScreen';
import NotebookScreen from './NotebookScreen';
import NoteDetailScreen from './NoteDetailScreen';
import TimelineScreen from './TimelineScreen';
import QuestGeneratorScreen from './QuestGeneratorScreen';

const Stack = createStackNavigator();

const CampaignNotebookNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#625b71',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="CampaignList"
        component={CampaignListScreen}
        options={{
          title: 'My Campaigns',
        }}
      />
      <Stack.Screen
        name="Notebook"
        component={NotebookScreen}
        options={{
          title: 'Campaign Notes',
        }}
      />
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
        options={{
          title: 'Note Details',
        }}
      />
      <Stack.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          title: 'Campaign Timeline',
        }}
      />
      <Stack.Screen
        name="QuestGenerator"
        component={QuestGeneratorScreen}
        options={{
          title: 'AI Quest Generator',
        }}
      />
    </Stack.Navigator>
  );
};

export default CampaignNotebookNavigator;