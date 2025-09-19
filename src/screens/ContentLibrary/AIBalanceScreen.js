import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Surface,
  Card,
  Text,
  Button,
  ProgressBar,
  Divider,
} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const AIBalanceScreen = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params || {};
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeBalance = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual AI API call)
    setTimeout(() => {
      const mockAnalysis = {
        powerLevel: Math.floor(Math.random() * 10) + 1,
        balanceScore: Math.floor(Math.random() * 100) + 1,
        suggestions: [
          'Consider reducing damage output by 10-15%',
          'Add a cooldown period to prevent spam usage',
          'Increase mana/resource cost for better balance',
          'Consider adding situational limitations',
        ],
        verdict: Math.random() > 0.5 ? 'Balanced' : 'Needs Adjustment',
        details: {
          damage: Math.floor(Math.random() * 10) + 1,
          utility: Math.floor(Math.random() * 10) + 1,
          cost: Math.floor(Math.random() * 10) + 1,
          availability: Math.floor(Math.random() * 10) + 1,
        }
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  return (
    <Surface style={styles.container}>
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="AI Balance Analysis" />
          <Card.Content>
            <Text variant="bodyLarge" style={styles.description}>
              Our AI will analyze your content for game balance, power level, 
              and provide suggestions for improvements.
            </Text>
            
            {item && (
              <Text variant="titleMedium" style={styles.itemName}>
                Analyzing: {item.name}
              </Text>
            )}
          </Card.Content>
        </Card>

        {!analysis && (
          <Button
            mode="contained"
            onPress={analyzeBalance}
            loading={isAnalyzing}
            style={styles.analyzeButton}
            icon="auto-fix"
          >
            {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
          </Button>
        )}

        {isAnalyzing && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">Analyzing Content...</Text>
              <ProgressBar indeterminate style={styles.progressBar} />
              <Text variant="bodyMedium" style={styles.progressText}>
                Please wait while our AI analyzes the balance and power level 
                of your content.
              </Text>
            </Card.Content>
          </Card>
        )}

        {analysis && (
          <Card style={styles.card}>
            <Card.Title title="Analysis Results" />
            <Card.Content>
              <Text 
                variant="headlineMedium" 
                style={[styles.verdict, { color: getScoreColor(analysis.balanceScore) }]}
              >
                {analysis.verdict}
              </Text>
              
              <Text variant="titleMedium" style={styles.scoreTitle}>
                Balance Score: {analysis.balanceScore}/100
              </Text>
              <ProgressBar 
                progress={analysis.balanceScore / 100} 
                color={getScoreColor(analysis.balanceScore)}
                style={styles.scoreBar}
              />

              <Divider style={styles.divider} />

              <Text variant="titleMedium" style={styles.detailsTitle}>
                Detailed Breakdown:
              </Text>
              
              <Text>Power Level: {analysis.powerLevel}/10</Text>
              <Text>Damage Rating: {analysis.details.damage}/10</Text>
              <Text>Utility Rating: {analysis.details.utility}/10</Text>
              <Text>Cost Balance: {analysis.details.cost}/10</Text>
              <Text>Availability: {analysis.details.availability}/10</Text>

              <Divider style={styles.divider} />

              <Text variant="titleMedium" style={styles.suggestionsTitle}>
                AI Suggestions:
              </Text>
              {analysis.suggestions.map((suggestion, index) => (
                <Text key={index} variant="bodyMedium" style={styles.suggestion}>
                  • {suggestion}
                </Text>
              ))}

              <Button
                mode="outlined"
                onPress={() => setAnalysis(null)}
                style={styles.reanalyzeButton}
                icon="refresh"
              >
                Run New Analysis
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
  itemName: {
    fontWeight: 'bold',
    color: '#6750a4',
  },
  analyzeButton: {
    margin: 16,
  },
  progressBar: {
    marginVertical: 16,
  },
  progressText: {
    textAlign: 'center',
    color: '#666',
  },
  verdict: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  scoreTitle: {
    marginBottom: 8,
  },
  scoreBar: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  detailsTitle: {
    marginBottom: 8,
  },
  suggestionsTitle: {
    marginBottom: 8,
  },
  suggestion: {
    marginLeft: 8,
    marginBottom: 4,
    lineHeight: 20,
  },
  reanalyzeButton: {
    marginTop: 16,
  },
});

export default AIBalanceScreen;