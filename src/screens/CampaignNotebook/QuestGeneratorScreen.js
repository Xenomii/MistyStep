import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Surface,
  Card,
  Text,
  Button,
  TextInput,
  Chip,
  Divider,
} from 'react-native-paper';

import { GoogleGenAI } from "@google/genai";
import useAppStore from '../../store';

const ai = new GoogleGenAI({apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY});

const QuestGeneratorScreen = ({ navigation }) => {
  const [questType, setQuestType] = useState('Monster Hunt');
  const [setting, setSetting] = useState('Urban');
  const [partyLevel, setPartyLevel] = useState('');
  const [generatedQuest, setGeneratedQuest] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { addNote, currentCampaign } = useAppStore();

  const questTypes = [
    'Rescue Mission', 'Treasure Hunt', 'Investigation',
    'Escort Quest', 'Dungeon Crawl', 'Political Intrigue',
    'Monster Hunt', 'Exploration',
  ];

  const settings = [
    'Urban', 'Forest', 'Mountain', 'Desert',
    'Coastal', 'Underground', 'Magical Realm', 'Ancient Ruins',
  ];

  const generateQuest = async () => {
    if (!questType || !setting) {
      Alert.alert('Info Needed', 'Please select a Quest Type and Setting first.');
      return;
    }

    setIsGenerating(true);
    try {
      // Prompt targeted for D&D 5e
      const promptText = `Act as an expert Dungeons & Dragons Dungeon Master. 
      Generate a creative quest for a D&D 5e campaign.
      Setting: ${setting}
      Quest Type: ${questType}
      Party Level: ${partyLevel || 'any'}

      Return ONLY a JSON object with this exact structure:
      {
        "title": "Quest Title",
        "description": "A detailed hook and story (3-4 sentences) including a twist.",
        "objectives": ["Objective 1", "Objective 2", "Objective 3"],
        "rewards": "Gold, items, or reputation"
      }
      Use high-fantasy terminology and ensure the JSON is valid. Do not include markdown code blocks.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash', 
        contents: promptText,
      });

      const text = response.text;

      // Clean the response in case the AI still wraps it in markdown backticks
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const questData = JSON.parse(cleanJson);
      
      setGeneratedQuest(questData);
    } catch (error) {
      console.error(error);
      Alert.alert('Generation Error', 'The AI failed to respond. Check your API key or connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToNotebook = () => {
  if (!generatedQuest) return;

  const noteData = {
    title: generatedQuest.title,
    isQuest: true, 
    questDescription: generatedQuest.description,
    questObjectives: generatedQuest.objectives.join('\n'), 
    questRewards: generatedQuest.rewards,
    content: generatedQuest.description, 
    tags: ['Quest', questType, setting],
    campaignId: currentCampaign?.id,
    createdAt: new Date().toISOString(),
  };

  addNote(noteData);
  Alert.alert('Success', 'Quest saved to your Campaign Notes!');
  navigation.goBack();
};

  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="AI Quest Parameters" subtitle="Powered by Gemini" />
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>Quest Type</Text>
            <View style={styles.chipsContainer}>
              {questTypes.map(type => (
                <Chip
                  key={type}
                  selected={questType === type}
                  onPress={() => setQuestType(type)}
                  style={styles.chip}
                >
                  {type}
                </Chip>
              ))}
            </View>

            <Text variant="titleMedium" style={styles.sectionTitle}>Setting</Text>
            <View style={styles.chipsContainer}>
              {settings.map(s => (
                <Chip
                  key={s}
                  selected={setting === s}
                  onPress={() => setSetting(s)}
                  style={styles.chip}
                >
                  {s}
                </Chip>
              ))}
            </View>

            <TextInput
              label="Party Level (Optional)"
              value={partyLevel}
              onChangeText={setPartyLevel}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <Button
              mode="contained"
              onPress={generateQuest}
              loading={isGenerating}
              disabled={isGenerating}
              style={styles.generateButton}
              icon="auto-fix"
            >
              Generate with Gemini
            </Button>
          </Card.Content>
        </Card>

        {generatedQuest && (
          <Card style={styles.card}>
            <Card.Title title={generatedQuest.title} titleVariant="headlineSmall" />
            <Card.Content>
              <Text variant="bodyMedium" style={styles.questDescription}>
                {generatedQuest.description}
              </Text>
              
              <Divider style={styles.divider} />
              
              <Text variant="titleMedium" style={styles.objectivesTitle}>Objectives:</Text>
              {generatedQuest.objectives.map((objective, index) => (
                <Text key={index} variant="bodyMedium" style={styles.objective}>
                  • {objective}
                </Text>
              ))}
              
              <Divider style={styles.divider} />
              
              <Text variant="titleMedium" style={styles.rewardsTitle}>Potential Rewards:</Text>
              <Text variant="bodyMedium">{generatedQuest.rewards}</Text>
              
              <Button
                mode="contained-tonal"
                onPress={handleSaveToNotebook}
                style={styles.saveButton}
                icon="content-save"
              >
                Save to Campaign Notes
              </Button>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  card: { marginBottom: 16 },
  sectionTitle: { marginTop: 16, marginBottom: 8 },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  chip: { margin: 4 },
  input: { marginBottom: 16 },
  generateButton: { marginTop: 8 },
  questDescription: { marginBottom: 16, lineHeight: 20 },
  divider: { marginVertical: 16 },
  objectivesTitle: { marginBottom: 8 },
  objective: { marginLeft: 8, marginBottom: 4 },
  rewardsTitle: { marginBottom: 8 },
  saveButton: { marginTop: 16 },
});

export default QuestGeneratorScreen;