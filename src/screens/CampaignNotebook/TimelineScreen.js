import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, Card, Button } from 'react-native-paper';

const TimelineScreen = () => {
  return (
    <Surface style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Campaign Timeline
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Coming Soon!
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            This feature will display a visual timeline of your campaign sessions, 
            major events, and story progression. You'll be able to track:
          </Text>
          <Text variant="bodyMedium" style={styles.features}>
            • Session summaries and dates{'\n'}
            • Major story milestones{'\n'}
            • Character development{'\n'}
            • Important events and decisions{'\n'}
            • Campaign duration and pacing
          </Text>
        </Card.Content>
      </Card>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  description: {
    marginBottom: 16,
  },
  features: {
    lineHeight: 24,
  },
});

export default TimelineScreen;