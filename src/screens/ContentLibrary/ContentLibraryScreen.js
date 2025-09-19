import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Surface,
  Card,
  Title,
  Paragraph,
  Text,
  FAB,
  Searchbar,
  Chip,
  Button,
  Menu,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import useAppStore from '../../store';
import { CONTENT_TYPES } from '../../types';

const ContentLibraryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  
  const { contentItems, initializeApp, loading } = useAppStore();

  useFocusEffect(
    React.useCallback(() => {
      initializeApp();
    }, [])
  );

  // Filter content by search query and types
  const filteredContent = useMemo(() => {
    return contentItems.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = selectedTypes.length === 0 || 
        selectedTypes.includes(item.type);
      
      return matchesSearch && matchesType;
    });
  }, [contentItems, searchQuery, selectedTypes]);

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleContentPress = (item) => {
    navigation.navigate('ContentDetail', { item });
  };

  const renderContentItem = ({ item }) => (
    <Card
      style={styles.contentCard}
      onPress={() => handleContentPress(item)}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.contentInfo}>
            <Title style={styles.contentTitle}>{item.name}</Title>
            <Paragraph numberOfLines={2} style={styles.contentDescription}>
              {item.description || 'No description available.'}
            </Paragraph>
            <View style={styles.contentMeta}>
              <Chip style={styles.typeChip} compact>
                {item.type}
              </Chip>
              <Text variant="bodySmall" style={styles.contentDate}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <Surface style={styles.container}>
        <Text style={styles.loadingText}>Loading content...</Text>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      {/* Search and Filter Header */}
      <View style={styles.header}>
        <Searchbar
          placeholder="Search content..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        {/* Filter Types */}
        <View style={styles.filtersContainer}>
          <Menu
            visible={showTypeMenu}
            onDismiss={() => setShowTypeMenu(false)}
            anchor={
              <Button 
                mode="outlined" 
                onPress={() => setShowTypeMenu(true)}
                icon="filter"
                compact
              >
                Filter by Type
              </Button>
            }
          >
            {CONTENT_TYPES.map(type => (
              <Menu.Item
                key={type}
                onPress={() => handleTypeToggle(type)}
                title={type}
                leadingIcon={selectedTypes.includes(type) ? "check" : undefined}
              />
            ))}
            {selectedTypes.length > 0 && (
              <>
                <Menu.Item onPress={() => {}} title="" />
                <Menu.Item 
                  onPress={() => setSelectedTypes([])}
                  title="Clear Filters"
                  leadingIcon="close"
                />
              </>
            )}
          </Menu>
        </View>

        {/* Selected Types Display */}
        {selectedTypes.length > 0 && (
          <View style={styles.selectedTypesContainer}>
            {selectedTypes.map(type => (
              <Chip
                key={type}
                onClose={() => handleTypeToggle(type)}
                style={styles.selectedType}
              >
                {type}
              </Chip>
            ))}
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate('ContentUpload')}
          style={styles.quickActionButton}
          icon="upload"
          compact
        >
          Upload Content
        </Button>
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate('AIBalance')}
          style={styles.quickActionButton}
          icon="auto-fix"
          compact
        >
          AI Balance Check
        </Button>
      </View>

      {/* Content List */}
      {filteredContent.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyTitle}>
            {contentItems.length === 0 ? 'No Content Yet' : 'No Matching Content'}
          </Text>
          <Text variant="bodyLarge" style={styles.emptyMessage}>
            {contentItems.length === 0 
              ? 'Start building your content library by uploading your first item!'
              : 'Try adjusting your search or filter criteria.'
            }
          </Text>
          {contentItems.length === 0 && (
            <Button
              mode="contained"
              onPress={() => navigation.navigate('ContentUpload')}
              style={styles.uploadFirstButton}
              icon="plus"
            >
              Upload First Item
            </Button>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredContent}
          renderItem={renderContentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Upload FAB */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('ContentUpload')}
        label="Upload"
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
  selectedTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  selectedType: {
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
  contentList: {
    padding: 16,
    paddingBottom: 100,
  },
  contentCard: {
    marginBottom: 12,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  contentDescription: {
    marginBottom: 8,
  },
  contentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeChip: {
    marginRight: 8,
  },
  contentDate: {
    color: '#666',
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
  uploadFirstButton: {
    marginTop: 16,
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

export default ContentLibraryScreen;