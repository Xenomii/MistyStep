import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  FAB, 
  IconButton, 
  Text,
  Surface,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import useAppStore from '../../store';

const CharacterListScreen = ({ navigation }) => {
  const { 
    characters, 
    deleteCharacter, 
    setCurrentCharacter,
    initializeApp,
    loading 
  } = useAppStore();

  useFocusEffect(
    React.useCallback(() => {
      initializeApp();
    }, [])
  );

  const handleCharacterPress = (character) => {
    setCurrentCharacter(character);
    navigation.navigate('CharacterDetail', { character });
  };

  const handleDeleteCharacter = (characterId) => {
    deleteCharacter(characterId);
  };

  const renderCharacterCard = ({ item: character }) => (
    <Card 
      style={styles.characterCard} 
      onPress={() => handleCharacterPress(character)}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.characterInfo}>
            <Title>{character.name || 'Unnamed Character'}</Title>
            <Paragraph>
              Level {character.level} {character.race} {character.class}
            </Paragraph>
          </View>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => handleDeleteCharacter(character.id)}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text variant="labelMedium">HP: {character.hitPoints}</Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="labelMedium">AC: {character.armorClass}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <Surface style={styles.container}>
        <Text style={styles.loadingText}>Loading characters...</Text>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      {characters.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyTitle}>
            No Characters Yet
          </Text>
          <Text variant="bodyLarge" style={styles.emptyMessage}>
            Create your first character to get started on your TTRPG adventure!
          </Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          renderItem={renderCharacterCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CharacterWizard')}
        label="Create Character"
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  characterCard: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  characterInfo: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statItem: {
    marginRight: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CharacterListScreen;