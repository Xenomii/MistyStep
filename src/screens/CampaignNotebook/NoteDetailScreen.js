import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Chip,
  Text,
  Card,
} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import useAppStore from '../../store';
import { NOTE_TAGS } from '../../types';

const NoteDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { note, isNew = false, campaign } = route.params || {};
  
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [selectedTags, setSelectedTags] = useState(note?.tags || []);
  
  const { addNote, updateNote } = useAppStore();

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a note title.');
      return;
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      tags: selectedTags,
    };

    if (isNew) {
      addNote(noteData);
      Alert.alert('Success', 'Note created successfully!');
    } else {
      updateNote(note.id, noteData);
      Alert.alert('Success', 'Note updated successfully!');
    }
    
    navigation.goBack();
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Note Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            
            <TextInput
              label="Content"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={15}
              style={styles.textArea}
            />

            <Text variant="titleMedium" style={styles.tagsTitle}>
              Tags
            </Text>
            <View style={styles.tagsContainer}>
              {NOTE_TAGS.map(tag => (
                <Chip
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onPress={() => toggleTag(tag)}
                  style={styles.tag}
                >
                  {tag}
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
          onPress={handleSave}
          style={styles.button}
        >
          {isNew ? 'Create Note' : 'Update Note'}
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
  textArea: {
    marginBottom: 16,
  },
  tagsTitle: {
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
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

export default NoteDetailScreen;