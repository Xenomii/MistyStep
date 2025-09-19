import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Surface,
  Card,
  Text,
  Button,
  TextInput,
  Chip,
  Divider,
} from 'react-native-paper';

const QuestGeneratorScreen = () => {
  const [questType, setQuestType] = useState('');
  const [setting, setSetting] = useState('');
  const [partyLevel, setPartyLevel] = useState('');
  const [generatedQuest, setGeneratedQuest] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const questTypes = [
    'Rescue Mission',
    'Treasure Hunt',
    'Investigation',
    'Escort Quest',
    'Dungeon Crawl',
    'Political Intrigue',
    'Monster Hunt',
    'Exploration',
  ];

  const settings = [
    'Urban',
    'Forest',
    'Mountain',
    'Desert',
    'Coastal',
    'Underground',
    'Magical Realm',
    'Ancient Ruins',
  ];

  const generateQuest = async () => {
    setIsGenerating(true);
    
    // Simulate AI quest generation (replace with actual AI API call)
    setTimeout(() => {
      const questIdeas = [
        {
          title: "The Missing Scholar",
          description: "A renowned scholar has vanished while researching ancient ruins. Local rumors speak of strange lights and eerie sounds coming from the site. The party must investigate the ruins, uncover what happened to the scholar, and deal with whatever supernatural forces may have been awakened.",
          objectives: [
            "Investigate the ancient ruins",
            "Find clues about the scholar's disappearance",
            "Confront the supernatural threat",
            "Rescue the scholar (if possible)"
          ],
          rewards: "Ancient magical artifact, gold, reputation with the local academic society"
        },
        {
          title: "The Merchant's Dilemma",
          description: "A wealthy merchant's caravan has been repeatedly attacked by bandits along a crucial trade route. However, investigation reveals that the 'bandits' are actually displaced villagers whose homes were destroyed by a territorial dragon. The party must find a solution that addresses both the merchant's needs and the villagers' plight.",
          objectives: [
            "Investigate the bandit attacks",
            "Discover the true nature of the 'bandits'",
            "Negotiate with the dragon",
            "Find a peaceful resolution"
          ],
          rewards: "Payment from merchant, gratitude of villagers, possible dragon ally"
        }
      ];
      
      const randomQuest = questIdeas[Math.floor(Math.random() * questIdeas.length)];
      setGeneratedQuest(randomQuest);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="AI Quest Generator" />
          <Card.Content>
            <Text variant="bodyMedium" style={styles.description}>
              Generate unique quest ideas based on your preferences. The AI will create 
              detailed quest scenarios with objectives and potential rewards.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Quest Type
            </Text>
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

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Setting
            </Text>
            <View style={styles.chipsContainer}>
              {settings.map(settingOption => (
                <Chip
                  key={settingOption}
                  selected={setting === settingOption}
                  onPress={() => setSetting(settingOption)}
                  style={styles.chip}
                >
                  {settingOption}
                </Chip>
              ))}
            </View>

            <TextInput
              label="Party Level (Optional)"
              value={partyLevel}
              onChangeText={setPartyLevel}
              keyboardType="numeric"
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={generateQuest}
              loading={isGenerating}
              disabled={isGenerating}
              style={styles.generateButton}
              icon="auto-fix"
            >
              {isGenerating ? 'Generating Quest...' : 'Generate Quest'}
            </Button>
          </Card.Content>
        </Card>

        {generatedQuest && (
          <Card style={styles.card}>
            <Card.Title title={generatedQuest.title} />
            <Card.Content>
              <Text variant="bodyMedium" style={styles.questDescription}>
                {generatedQuest.description}
              </Text>
              
              <Divider style={styles.divider} />
              
              <Text variant="titleMedium" style={styles.objectivesTitle}>
                Objectives:
              </Text>
              {generatedQuest.objectives.map((objective, index) => (
                <Text key={index} variant="bodyMedium" style={styles.objective}>
                  • {objective}
                </Text>
              ))}
              
              <Divider style={styles.divider} />
              
              <Text variant="titleMedium" style={styles.rewardsTitle}>
                Potential Rewards:
              </Text>
              <Text variant="bodyMedium">{generatedQuest.rewards}</Text>
              
              <Button
                mode="outlined"
                onPress={() => {
                  // This would save the quest as a note
                  alert('Quest saved to campaign notes!');
                }}
                style={styles.saveButton}
                icon="content-save"
              >
                Save as Campaign Note
              </Button>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
  },
  input: {
    marginBottom: 16,
  },
  generateButton: {
    marginTop: 8,
  },
  questDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  divider: {
    marginVertical: 16,
  },
  objectivesTitle: {
    marginBottom: 8,
  },
  objective: {
    marginLeft: 8,
    marginBottom: 4,
  },
  rewardsTitle: {
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default QuestGeneratorScreen;