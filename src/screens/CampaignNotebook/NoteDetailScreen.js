import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Surface,
  TextInput,
  Button,
  Chip,
  Text,
  Card,
  Divider,
} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import useAppStore from '../../store';
import { NOTE_TAGS } from '../../types';

const NoteDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { note, isNew = false, campaign } = route.params || {};
  
  const { addNote, updateNote, deleteNote, currentCampaign } = useAppStore();

  // Determine if this is a structured Quest or a normal Note
  const [isQuest, setIsQuest] = useState(note?.isQuest || false);

  // Common State
  const [title, setTitle] = useState(note?.title || '');
  const [selectedTags, setSelectedTags] = useState(note?.tags || []);

  // Normal Note State
  const [content, setContent] = useState(note?.content || '');

  // Quest-Specific State
  const [questDescription, setQuestDescription] = useState(note?.questDescription || '');
  const [questObjectives, setQuestObjectives] = useState(note?.questObjectives || '');
  const [questRewards, setQuestRewards] = useState(note?.questRewards || '');

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title.');
      return;
    }

    const noteData = {
      title: title.trim(),
      tags: selectedTags,
      campaignId: note?.campaignId || campaign?.id || currentCampaign?.id,
      isQuest: isQuest,
      // Save structured data if quest, otherwise save standard content
      ...(isQuest ? {
        questDescription: questDescription.trim(),
        questObjectives: questObjectives.trim(),
        questRewards: questRewards.trim(),
        // We sync description to 'content' so it still shows a preview in the list view
        content: questDescription.trim(), 
      } : {
        content: content.trim(),
      })
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

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNote(note.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label={isQuest ? "Quest Title" : "Note Title"}
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              mode="outlined"
            />

            {isQuest ? (
              /* QUEST-SPECIFIC MULTI-INPUT SECTION */
              <View>
                <TextInput
                  label="Quest Description"
                  value={questDescription}
                  onChangeText={setQuestDescription}
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                  mode="outlined"
                />
                
                <TextInput
                  label="Objectives"
                  placeholder="• Objective 1&#10;• Objective 2"
                  value={questObjectives}
                  onChangeText={setQuestObjectives}
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                  mode="outlined"
                />

                <TextInput
                  label="Rewards"
                  value={questRewards}
                  onChangeText={setQuestRewards}
                  multiline
                  numberOfLines={2}
                  style={styles.input}
                  mode="outlined"
                />
              </View>
            ) : (
              /* NORMAL NOTE SECTION */
              <TextInput
                label="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={15}
                style={styles.textArea}
                mode="outlined"
              />
            )}

            <Divider style={styles.divider} />

            <Text variant="titleMedium" style={styles.tagsTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {NOTE_TAGS.map((tag) => (
                <Chip
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onPress={() => toggleTag(tag)}
                  style={styles.tag}
                  showSelectedOverlay
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
        
        {!isNew && (
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={styles.button}
            textColor="#ba1a1a"
          >
            Delete
          </Button>
        )}

        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.button}
        >
          {isNew ? 'Create' : 'Update'}
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
    elevation: 1,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  textArea: {
    marginBottom: 16,
    minHeight: 300,
    backgroundColor: 'white',
  },
  divider: {
    marginVertical: 8,
    marginBottom: 16,
  },
  tagsTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flex: 1,
  },
});

export default NoteDetailScreen;