import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContentLibraryScreen from './ContentLibraryScreen';
import ContentDetailScreen from './ContentDetailScreen';
import ContentUploadScreen from './ContentUploadScreen';
import AIBalanceScreen from './AIBalanceScreen';

const Stack = createStackNavigator();

const ContentLibraryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7d5260',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ContentLibrary"
        component={ContentLibraryScreen}
        options={{
          title: 'Content Library',
        }}
      />
      <Stack.Screen
        name="ContentDetail"
        component={ContentDetailScreen}
        options={{
          title: 'Content Details',
        }}
      />
      <Stack.Screen
        name="ContentUpload"
        component={ContentUploadScreen}
        options={{
          title: 'Upload Content',
        }}
      />
      <Stack.Screen
        name="AIBalance"
        component={AIBalanceScreen}
        options={{
          title: 'AI Balance Check',
        }}
      />
    </Stack.Navigator>
  );
};

export default ContentLibraryNavigator;