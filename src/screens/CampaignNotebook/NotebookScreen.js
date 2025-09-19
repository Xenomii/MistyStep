import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Surface,
  Card,
  Title,
  Paragraph,
  Text,
  FAB,
  IconButton,
  Searchbar,
  Chip,
  Menu,
  Button,
} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import useAppStore from '../../store';
import { NOTE_TAGS } from '../../types';

const NotebookScreen = ({ navigation }) => {
  const route = useRoute();
  const { campaign } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagMenu, setShowTagMenu] = useState(false);
  
  const { notes, currentCampaign } = useAppStore();

  // Filter notes for current campaign
  const campaignNotes = useMemo(() => {
    return notes.filter(note => note.campaignId === campaign?.id || note.campaignId === currentCampaign?.id);
  }, [notes, campaign, currentCampaign]);

  // Filter notes by search query and tags
  const filteredNotes = useMemo(() => {
    return campaignNotes.filter(note => {
      const matchesSearch = searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => note.tags && note.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [campaignNotes, searchQuery, selectedTags]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleNotePress = (note) => {
    navigation.navigate('NoteDetail', { note });
  };

  const renderNote = ({ item: note }) => (
    <Card
      style={styles.noteCard}
      onPress={() => handleNotePress(note)}
    >
      <Card.Content>
        <View style={styles.noteHeader}>
          <Title style={styles.noteTitle}>{note.title}</Title>
          <Text variant="bodySmall" style={styles.noteDate}>
            {new Date(note.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Paragraph numberOfLines={3} style={styles.noteContent}>
          {note.content}
        </Paragraph>
        {note.tags && note.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {note.tags.map((tag, index) => (
              <Chip key={index} style={styles.tag} compact>
                {tag}
              </Chip>
            ))}
          </View>
        )}
      </Card.Content>
    </Card>
  );

  const handleAddNote = () => {
    navigation.navigate('NoteDetail', { 
      isNew: true, 
      campaign: campaign || currentCampaign 
    });
  };

  return (
    <Surface style={styles.container}>
      {/* Search and Filter Header */}
      <View style={styles.header}>
        <Searchbar
          placeholder="Search notes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        {/* Filter Tags */}
        <View style={styles.filtersContainer}>
          <Menu
            visible={showTagMenu}
            onDismiss={() => setShowTagMenu(false)}
            anchor={
              <Button 
                mode="outlined" 
                onPress={() => setShowTagMenu(true)}
                icon="filter"
                compact
              >
                Filter by Tags
              </Button>
            }
          >
            {NOTE_TAGS.map(tag => (
              <Menu.Item
                key={tag}
                onPress={() => handleTagToggle(tag)}
                title={tag}
                leadingIcon={selectedTags.includes(tag) ? "check" : undefined}
              />
            ))}
            {selectedTags.length > 0 && (
              <>
                <Menu.Item onPress={() => {}} title="" />
                <Menu.Item 
                  onPress={() => setSelectedTags([])}
                  title="Clear Filters"
                  leadingIcon="close"
                />
              </>
            )}
          </Menu>
        </View>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <View style={styles.selectedTagsContainer}>
            {selectedTags.map(tag => (
              <Chip
                key={tag}
                onClose={() => handleTagToggle(tag)}
                style={styles.selectedTag}
              >
                {tag}
              </Chip>
            ))}
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate('Timeline')}
          style={styles.quickActionButton}
          icon="timeline"
          compact
        >
          Timeline
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate('QuestGenerator')}
          style={styles.quickActionButton}
          icon="auto-fix"
          compact
        >
          AI Quest Gen
        </Button>
      </View>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyTitle}>
            {campaignNotes.length === 0 ? 'No Notes Yet' : 'No Matching Notes'}
          </Text>
          <Text variant="bodyLarge" style={styles.emptyMessage}>
            {campaignNotes.length === 0 
              ? 'Start documenting your campaign by adding your first note!'
              : 'Try adjusting your search or filter criteria.'
            }
          </Text>
          {campaignNotes.length === 0 && (
            <Button
              mode="contained"
              onPress={handleAddNote}
              style={styles.addFirstNoteButton}
              icon="plus"
            >
              Add First Note
            </Button>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notesList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Add Note FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddNote}
        label="Add Note"
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    elevation: 2,
  },
  searchBar: {
    marginBottom: 12,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  selectedTag: {
    margin: 2,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  quickActionButton: {
    marginRight: 8,
  },
  notesList: {
    padding: 16,
    paddingBottom: 100,
  },
  noteCard: {
    marginBottom: 12,
    elevation: 1,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noteTitle: {
    flex: 1,
    fontSize: 18,
  },
  noteDate: {
    color: '#666',
    marginLeft: 8,
  },
  noteContent: {
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 4,
    marginBottom: 4,
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
    marginBottom: 24,
  },
  addFirstNoteButton: {
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default NotebookScreen;