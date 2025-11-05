import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function IntroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CampusVoice</Text>
      <Text style={styles.subtitle}>Connect • Collaborate • Create</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Auth')} // <-- navigate to AuthScreen
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#39ACB5',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#407ED1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
