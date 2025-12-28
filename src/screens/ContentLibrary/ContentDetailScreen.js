import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Surface, Card, Title, Text, Chip, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import useAppStore from '../../store'; 

const ContentDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const { deleteContentItem } = useAppStore(); // ✅ access from store

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteContentItem(item.id);
            Alert.alert('Deleted', 'Content item deleted successfully.');
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
            <Title>{item.name}</Title>
            <Chip style={styles.typeChip}>{item.type}</Chip>
            <Text variant="bodyLarge" style={styles.description}>
              {item.description || 'No description available.'}
            </Text>
            <Text variant="bodySmall" style={styles.date}>
              Created: {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('AIBalance', { item })}
          style={styles.balanceButton}
          icon="auto-fix"
        >
          Check AI Balance
        </Button>
        <Button
          mode="outlined"
          onPress={handleDelete}
          style={styles.deleteButton}
          textColor="red"
          icon="delete"
          >
          Delete Content
      </Button>
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
  typeChip: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  description: {
    marginVertical: 16,
    lineHeight: 20,
  },
  date: {
    color: '#666',
    marginTop: 8,
  },
  balanceButton: {
    margin: 16,
  },
  deleteButton: {
  marginHorizontal: 16,
  marginBottom: 24,
},
});

export default ContentDetailScreen;