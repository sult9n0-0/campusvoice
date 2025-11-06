import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';

const allMessages = {
  '1': [
    { id: '1', sender: 'user#101', text: 'Did you watch the latest episode?', time: '10:45 AM' },
    { id: '2', sender: 'user#202', text: 'Yes! It was amazing 😍', time: '10:50 AM' },
  ],
  '2': [
    { id: '1', sender: 'user#202', text: 'Training at 5 pm today!', time: '9:30 AM' },
  ],
  '3': [
    { id: '1', sender: 'user#404', text: 'Goal celebration was epic!', time: '8:20 PM' },
  ],
  '4': [
    { id: '1', sender: 'user#505', text: 'Let\'s play doubles tomorrow?', time: '7:15 PM' },
    { id: '2', sender: 'user#606', text: 'I am in! What time?', time: '7:20 PM' },
    { id: '3', sender: 'user#707', text: 'Can join after 6 pm.', time: '7:22 PM' },
  ],
  '5': [
    { id: '1', sender: 'user#606', text: 'Check this hilarious meme 😂', time: 'Today' },
  ],
};

export default function ChatScreen() {
  const router = useRouter();
  const { chatId } = useSearchParams(); // dynamic chatId from index.tsx
  const messages = allMessages[chatId] || [];

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageSender}>{item.sender}:</Text>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <Text onPress={() => router.back()} style={styles.backText}>Back</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={{ padding: 20 }}
      />

      <TextInput
        placeholder="Type a message..."
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  backText: { color: '#407ED1', fontSize: 16 },
  messageItem: { marginBottom: 15, padding: 12, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 1 },
  messageSender: { fontWeight: '700', color: '#407ED1', marginBottom: 2 },
  messageText: { fontSize: 14, color: '#333' },
  messageTime: { fontSize: 12, color: '#888', marginTop: 2, alignSelf: 'flex-end' },
  input: { padding: 12, backgroundColor: '#fff', margin: 16, borderRadius: 10, fontSize: 14 },
});
