import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Surface,
  Card,
  Title,
  Paragraph,
  Text,
  Button,
  IconButton,
  Chip,
  TextInput,
  Divider,
} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import useAppStore from '../../store';
import { STATS } from '../../types';

const CharacterDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { character: initialCharacter } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState(initialCharacter);
  const { updateCharacter, deleteCharacter } = useAppStore();

  const handleSave = () => {
    updateCharacter(initialCharacter.id, editedCharacter);
    setIsEditing(false);
    Alert.alert('Success', 'Character updated successfully!');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Character',
      'Are you sure you want to delete this character? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCharacter(initialCharacter.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const calculateModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  const formatModifier = (modifier) => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const exportCharacterSheet = () => {
    // This would export the character sheet as PDF or share it
    Alert.alert('Export', 'Character sheet export feature coming soon!');
  };

  const character = isEditing ? editedCharacter : initialCharacter;

  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Card */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <View style={styles.characterInfo}>
                {isEditing ? (
                  <TextInput
                    value={editedCharacter.name}
                    onChangeText={(text) =>
                      setEditedCharacter({ ...editedCharacter, name: text })
                    }
                    style={styles.nameInput}
                  />
                ) : (
                  <Title>{character.name}</Title>
                )}
                <Paragraph>
                  Level {character.level} {character.race} {character.class}
                </Paragraph>
              </View>
              <View style={styles.headerButtons}>
                <IconButton
                  icon={isEditing ? 'check' : 'pencil'}
                  onPress={isEditing ? handleSave : () => setIsEditing(true)}
                />
                <IconButton icon="delete" onPress={handleDelete} />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Stats Card */}
        <Card style={styles.card}>
          <Card.Title title="Ability Scores" />
          <Card.Content>
            <View style={styles.statsGrid}>
              {STATS.map((stat) => (
                <View key={stat} style={styles.statBox}>
                  <Text variant="labelLarge" style={styles.statName}>
                    {stat.substring(0, 3).toUpperCase()}
                  </Text>
                  {isEditing ? (
                    <TextInput
                      value={String(editedCharacter.stats[stat])}
                      onChangeText={(text) =>
                        setEditedCharacter({
                          ...editedCharacter,
                          stats: {
                            ...editedCharacter.stats,
                            [stat]: parseInt(text) || 10,
                          },
                        })
                      }
                      keyboardType="numeric"
                      style={styles.statScoreInput}
                      dense
                    />
                  ) : (
                    <Text variant="headlineMedium" style={styles.statScore}>
                      {character.stats[stat]}
                    </Text>
                  )}
                  <Text variant="bodyMedium" style={styles.statModifier}>
                    {formatModifier(calculateModifier(character.stats[stat]))}
                  </Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Combat Stats Card */}
        <Card style={styles.card}>
          <Card.Title title="Combat Stats" />
          <Card.Content>
            <View style={styles.combatStatsRow}>
              <View style={styles.combatStat}>
                <Text variant="labelLarge">Hit Points</Text>
                {isEditing ? (
                  <TextInput
                    value={String(editedCharacter.hitPoints)}
                    onChangeText={(text) =>
                      setEditedCharacter({
                        ...editedCharacter,
                        hitPoints: parseInt(text) || 0,
                      })
                    }
                    keyboardType="numeric"
                    style={styles.combatStatInput}
                    dense
                  />
                ) : (
                  <Text variant="headlineMedium">{character.hitPoints}</Text>
                )}
              </View>
              <View style={styles.combatStat}>
                <Text variant="labelLarge">Armor Class</Text>
                {isEditing ? (
                  <TextInput
                    value={String(editedCharacter.armorClass)}
                    onChangeText={(text) =>
                      setEditedCharacter({
                        ...editedCharacter,
                        armorClass: parseInt(text) || 10,
                      })
                    }
                    keyboardType="numeric"
                    style={styles.combatStatInput}
                    dense
                  />
                ) : (
                  <Text variant="headlineMedium">{character.armorClass}</Text>
                )}
              </View>
              <View style={styles.combatStat}>
                <Text variant="labelLarge">Proficiency Bonus</Text>
                <Text variant="headlineMedium">
                  +{character.proficiencyBonus}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Character Details Card */}
        <Card style={styles.card}>
          <Card.Title title="Character Details" />
          <Card.Content>
            <View style={styles.detailRow}>
              <Text variant="labelLarge">Race: </Text>
              <Chip>{character.race}</Chip>
            </View>
            <View style={styles.detailRow}>
              <Text variant="labelLarge">Class: </Text>
              <Chip>{character.class}</Chip>
            </View>
            <View style={styles.detailRow}>
              <Text variant="labelLarge">Level: </Text>
              <Text variant="bodyLarge">{character.level}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Backstory Card */}
        <Card style={styles.card}>
          <Card.Title title="Backstory" />
          <Card.Content>
            {isEditing ? (
              <TextInput
                value={editedCharacter.backstory}
                onChangeText={(text) =>
                  setEditedCharacter({ ...editedCharacter, backstory: text })
                }
                multiline
                numberOfLines={6}
                style={styles.textArea}
              />
            ) : (
              <Text variant="bodyMedium">
                {character.backstory || 'No backstory provided.'}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Notes Card */}
        <Card style={styles.card}>
          <Card.Title title="Notes" />
          <Card.Content>
            {isEditing ? (
              <TextInput
                value={editedCharacter.notes}
                onChangeText={(text) =>
                  setEditedCharacter({ ...editedCharacter, notes: text })
                }
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
            ) : (
              <Text variant="bodyMedium">
                {character.notes || 'No additional notes.'}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Export Button */}
        {!isEditing && (
          <Button
            mode="contained"
            onPress={exportCharacterSheet}
            style={styles.exportButton}
            icon="file-export"
          >
            Export Character Sheet
          </Button>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  characterInfo: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  nameInput: {
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  statName: {
    marginBottom: 4,
  },
  statScore: {
    fontWeight: 'bold',
  },
  statScoreInput: {
    width: 60,
    textAlign: 'center',
  },
  statModifier: {
    marginTop: 4,
  },
  combatStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  combatStat: {
    alignItems: 'center',
    flex: 1,
  },
  combatStatInput: {
    width: 80,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textArea: {
    marginBottom: 8,
  },
  exportButton: {
    margin: 16,
  },
  bottomSpacer: {
    height: 32,
  },
});

export default CharacterDetailScreen;