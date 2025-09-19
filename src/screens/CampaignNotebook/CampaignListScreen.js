import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import {
  Surface,
  Card,
  Title,
  Paragraph,
  Text,
  FAB,
  IconButton,
  Button,
  TextInput,
  Dialog,
  Portal,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import useAppStore from '../../store';

const CampaignListScreen = ({ navigation }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignDescription, setNewCampaignDescription] = useState('');
  
  const {
    campaigns,
    addCampaign,
    setCurrentCampaign,
    initializeApp,
    loading,
  } = useAppStore();

  useFocusEffect(
    React.useCallback(() => {
      initializeApp();
    }, [])
  );

  const handleCreateCampaign = () => {
    if (!newCampaignName.trim()) {
      Alert.alert('Error', 'Please enter a campaign name.');
      return;
    }

    const campaign = {
      name: newCampaignName.trim(),
      description: newCampaignDescription.trim(),
      sessionCount: 0,
    };

    addCampaign(campaign);
    setNewCampaignName('');
    setNewCampaignDescription('');
    setShowCreateDialog(false);
    
    Alert.alert('Success', 'Campaign created successfully!');
  };

  const handleCampaignPress = (campaign) => {
    setCurrentCampaign(campaign);
    navigation.navigate('Notebook', { campaign });
  };

  const renderCampaignCard = ({ item: campaign }) => (
    <Card
      style={styles.campaignCard}
      onPress={() => handleCampaignPress(campaign)}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.campaignInfo}>
            <Title>{campaign.name}</Title>
            <Paragraph numberOfLines={2}>
              {campaign.description || 'No description provided.'}
            </Paragraph>
            <Text variant="bodySmall" style={styles.sessionCount}>
              Sessions: {campaign.sessionCount || 0}
            </Text>
          </View>
          <IconButton
            icon="chevron-right"
            size={24}
          />
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <Surface style={styles.container}>
        <Text style={styles.loadingText}>Loading campaigns...</Text>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      {campaigns.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyTitle}>
            No Campaigns Yet
          </Text>
          <Text variant="bodyLarge" style={styles.emptyMessage}>
            Create your first campaign to start documenting your TTRPG adventures!
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowCreateDialog(true)}
            style={styles.createButton}
            icon="plus"
          >
            Create Campaign
          </Button>
        </View>
      ) : (
        <FlatList
          data={campaigns}
          renderItem={renderCampaignCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {campaigns.length > 0 && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setShowCreateDialog(true)}
          label="New Campaign"
        />
      )}

      {/* Create Campaign Dialog */}
      <Portal>
        <Dialog visible={showCreateDialog} onDismiss={() => setShowCreateDialog(false)}>
          <Dialog.Title>Create New Campaign</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Campaign Name"
              value={newCampaignName}
              onChangeText={setNewCampaignName}
              style={styles.dialogInput}
            />
            <TextInput
              label="Description (Optional)"
              value={newCampaignDescription}
              onChangeText={setNewCampaignDescription}
              multiline
              numberOfLines={3}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onPress={handleCreateCampaign} mode="contained">
              Create
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  campaignCard: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignInfo: {
    flex: 1,
  },
  sessionCount: {
    marginTop: 4,
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
  createButton: {
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
  dialogInput: {
    marginBottom: 16,
  },
});

export default CampaignListScreen;