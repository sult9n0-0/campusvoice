import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CampusVoice</Text>
      
      <View style={styles.sloganContainer}>
        <Text style={styles.slogan}>Connect.</Text>
        <Text style={styles.slogan}>Collaborate.</Text>
        <Text style={styles.slogan}>Create.</Text>
      </View>

      <Link href="/auth" style={styles.highlightBox}>
        <Text style={styles.highlightText}>
          Start exploring projects & connect with peers!
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  sloganContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  slogan: {
    fontSize: 22,
    fontWeight: '600',
    color: '#39ACB5',
    fontStyle: 'italic',
  },
  highlightBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  highlightText: {
    color: '#1A1A1A',
    fontSize: 16,
    textAlign: 'center',
  },
});
