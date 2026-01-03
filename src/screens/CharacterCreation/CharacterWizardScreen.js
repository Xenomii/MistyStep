import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Surface,
  ProgressBar,
  Button,
  Text,
  TextInput,
  Card,
  Divider,
  Chip,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAppStore from '../../store';
import { RACES, CLASSES, STATS, DEFAULT_CHARACTER } from '../../types';
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY});

const schema = yup.object().shape({
  name: yup.string().required('Character name is required'),
  race: yup.string().required('Please select a race'),
  class: yup.string().required('Please select a class'),
});

const CharacterWizardScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [generatingWithAI, setGeneratingWithAI] = useState(false);
  const { addCharacter } = useAppStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...DEFAULT_CHARACTER,
      stats: { ...DEFAULT_CHARACTER.stats },
    },
  });

  const watchedValues = watch();
  const totalSteps = 4;
  const progress = (currentStep + 1) / totalSteps;

  const generateRandomStats = () => {
    const newStats = {};
    STATS.forEach(stat => {
      // Roll 4d6, drop lowest (common D&D method)
      const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
      rolls.sort((a, b) => b - a);
      newStats[stat] = rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
    });
    
    STATS.forEach(stat => {
      setValue(`stats.${stat}`, newStats[stat]);
    });
  };

  const generateWithAI = async () => {
    setGeneratingWithAI(true);
    
    try {
      const promptText = `Act as an expert Dungeons & Dragons Dungeon Master. 
      Generate a creative D&D 5e character.
      
      Constraints:
      - Name: Must be fantasy-based and NOT exceed five words.
      - Race: Choose one from [${RACES.join(', ')}].
      - Class: Choose one from [${CLASSES.join(', ')}].
      
      Return ONLY a JSON object with this exact structure:
      {
        "name": "Character Name",
        "race": "Selected Race",
        "class": "Selected Class",
        "backstory": "A compelling 2-3 sentence backstory."
      }
      Do not include markdown code blocks.`;

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
      });

      const text = response.text;
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const characterData = JSON.parse(cleanJson);

      // Apply generated values to form
      setValue('name', characterData.name);
      setValue('race', characterData.race);
      setValue('class', characterData.class);
      setValue('backstory', characterData.backstory);
      
      // Generate stats locally to ensure valid D&D mechanics
      generateRandomStats();
      
    } catch (error) {
      console.error("AI Generation Error:", error);
      Alert.alert('AI Error', 'Failed to reach the DM. Check your connection or API key.');
    } finally {
      setGeneratingWithAI(false);
    }
  };

  const calculateHitPoints = () => {
    const constitutionModifier = Math.floor((watchedValues.stats?.Constitution - 10) / 2);
    const baseHP = 10; // Default base HP
    return Math.max(1, baseHP + constitutionModifier);
  };

  const calculateArmorClass = () => {
    const dexterityModifier = Math.floor((watchedValues.stats?.Dexterity - 10) / 2);
    return 10 + dexterityModifier;
  };

  const onSubmit = (data) => {
    const character = {
      ...data,
      hitPoints: calculateHitPoints(),
      armorClass: calculateArmorClass(),
    };
    
    addCharacter(character);
    
    Alert.alert(
      'Character Created!',
      `${character.name} has been created successfully.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfoStep();
      case 1:
        return renderRaceClassStep();
      case 2:
        return renderStatsStep();
      case 3:
        return renderBackstoryStep();
      default:
        return null;
    }
  };

  const renderBasicInfoStep = () => (
    <Card style={styles.stepCard}>
      <Card.Title title="Basic Information" />
      <Card.Content>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Character Name"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={!!errors.name}
              style={styles.input}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Button
          mode="outlined"
          onPress={generateWithAI}
          loading={generatingWithAI}
          style={styles.aiButton}
          icon="auto-fix"
        >
          Generate with AI
        </Button>
      </Card.Content>
    </Card>
  );

  const renderRaceClassStep = () => (
    <Card style={styles.stepCard}>
      <Card.Title title="Race & Class" />
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Race
        </Text>
        <View style={styles.chipContainer}>
          {RACES.map((race) => (
            <Chip
              key={race}
              selected={watchedValues.race === race}
              onPress={() => setValue('race', race)}
              style={styles.chip}
            >
              {race}
            </Chip>
          ))}
        </View>
        {errors.race && (
          <Text style={styles.errorText}>{errors.race.message}</Text>
        )}

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Class
        </Text>
        <View style={styles.chipContainer}>
          {CLASSES.map((characterClass) => (
            <Chip
              key={characterClass}
              selected={watchedValues.class === characterClass}
              onPress={() => setValue('class', characterClass)}
              style={styles.chip}
            >
              {characterClass}
            </Chip>
          ))}
        </View>
        {errors.class && (
          <Text style={styles.errorText}>{errors.class.message}</Text>
        )}
      </Card.Content>
    </Card>
  );

  const renderStatsStep = () => (
    <Card style={styles.stepCard}>
      <Card.Title title="Ability Scores" />
      <Card.Content>
        <Button
          mode="outlined"
          onPress={generateRandomStats}
          style={styles.rollStatsButton}
          icon="dice-6"
        >
          Roll Random Stats
        </Button>

        {STATS.map((stat) => (
          <View key={stat} style={styles.statRow}>
            <Text style={styles.statLabel}>{stat}</Text>
            <Controller
              control={control}
              name={`stats.${stat}`}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={String(value)}
                  onChangeText={(text) => onChange(parseInt(text) || 10)}
                  keyboardType="numeric"
                  style={styles.statInput}
                  dense
                />
              )}
            />
            <Text style={styles.modifierText}>
              {Math.floor((watchedValues.stats?.[stat] - 10) / 2) >= 0 ? '+' : ''}
              {Math.floor((watchedValues.stats?.[stat] - 10) / 2)}
            </Text>
          </View>
        ))}

        <Divider style={styles.divider} />
        <Text>Calculated HP: {calculateHitPoints()}</Text>
        <Text>Calculated AC: {calculateArmorClass()}</Text>
      </Card.Content>
    </Card>
  );

  const renderBackstoryStep = () => (
    <Card style={styles.stepCard}>
      <Card.Title title="Character Background" />
      <Card.Content>
        <Controller
          control={control}
          name="backstory"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Backstory"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              multiline
              numberOfLines={6}
              style={styles.textArea}
            />
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Additional Notes"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
          )}
        />
      </Card.Content>
    </Card>
  );

  return (
    <Surface style={styles.container}>
      <ProgressBar progress={progress} style={styles.progressBar} />
      
      <ScrollView style={styles.content}>
        {renderStep()}
      </ScrollView>

      <View style={styles.navigationButtons}>
        <Button
          mode="outlined"
          onPress={prevStep}
          disabled={currentStep === 0}
          style={styles.navButton}
        >
          Previous
        </Button>

        {currentStep === totalSteps - 1 ? (
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
            style={styles.navButton}
          >
            Create Character
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={nextStep}
            style={styles.navButton}
          >
            Next
          </Button>
        )}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressBar: {
    height: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stepCard: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  textArea: {
    marginBottom: 16,
  },
  aiButton: {
    marginTop: 8,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    margin: 4,
  },
  rollStatsButton: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    flex: 1,
    fontSize: 16,
  },
  statInput: {
    width: 60,
    marginRight: 16,
  },
  modifierText: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
  },
});

export default CharacterWizardScreen;