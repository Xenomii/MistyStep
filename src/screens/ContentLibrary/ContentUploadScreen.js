import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Surface,
  Card,
  TextInput,
  Button,
  Text,
  Chip,
} from 'react-native-paper';
import useAppStore from '../../store';
import { CONTENT_TYPES } from '../../types';

const ContentUploadScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const { addContentItem } = useAppStore();

  const handleUpload = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a content name.');
      return;
    }
    
    if (!selectedType) {
      Alert.alert('Error', 'Please select a content type.');
      return;
    }

    setIsUploading(true);
    
    const contentItem = {
      name: name.trim(),
      description: description.trim(),
      type: selectedType,
    };

    // Simulate upload delay
    setTimeout(() => {
      addContentItem(contentItem);
      Alert.alert('Success', 'Content uploaded successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
      setIsUploading(false);
    }, 1000);
  };

  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="Upload New Content" />
          <Card.Content>
            <TextInput
              label="Content Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            
            <TextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.input}
            />

            <Text variant="titleMedium" style={styles.typeTitle}>
              Content Type
            </Text>
            <View style={styles.typeContainer}>
              {CONTENT_TYPES.map(type => (
                <Chip
                  key={type}
                  selected={selectedType === type}
                  onPress={() => setSelectedType(type)}
                  style={styles.typeChip}
                >
                  {type}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleUpload}
          loading={isUploading}
          style={styles.button}
        >
          Upload Content
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  typeTitle: {
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeChip: {
    margin: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ContentUploadScreen;