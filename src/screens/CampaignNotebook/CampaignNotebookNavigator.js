import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CampaignListScreen from './CampaignListScreen';
import NotebookScreen from './NotebookScreen';
import NoteDetailScreen from './NoteDetailScreen';
import TimelineScreen from './TimelineScreen';
import QuestGeneratorScreen from './QuestGeneratorScreen';
import { IconButton } from 'react-native-paper';
import useAppStore from '../../store';
import { Alert } from 'react-native';


const Stack = createStackNavigator();

const CampaignNotebookNavigator = () => {
  const { deleteCampaign, currentCampaign, setCurrentCampaign } = useAppStore();
  
  const handleDeleteCampaign = (navigation) => {
    if (!currentCampaign) {
      Alert.alert('Error', 'No campaign selected.');
      return;
    }

    Alert.alert(
      'Delete Campaign',
      `Are you sure you want to delete "${currentCampaign.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCampaign(currentCampaign.id);
            setCurrentCampaign(null);
            navigation.navigate('CampaignList');
            Alert.alert('Deleted', 'Campaign deleted successfully.');
          },
        },
      ]
    );
  };

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
        options={({ navigation }) => ({
          title: 'Campaign Notes',
          headerRight: () => (
            <IconButton
              icon="delete"
              iconColor="#e63737ff"
              size={28}
              onPress={() => handleDeleteCampaign(navigation)}
            />
          ),
        })}
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