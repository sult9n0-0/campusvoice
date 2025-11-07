import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const chats = [
  { id: '1', name: 'Otaku Zone', sender: 'user#101', lastMessage: 'Did you watch the latest episode?', time: '10:45 AM' },
  { id: '2', name: 'Volleyball', sender: 'user#202', lastMessage: 'Training at 5 pm today!', time: '9:30 AM' },
  { id: '3', name: 'Football', sender: 'user#404', lastMessage: 'Goal celebration was epic!', time: '8:20 PM' },
  { id: '4', name: 'Badminton', sender: 'user#505', lastMessage: 'Let\'s play doubles tomorrow?', time: '7:15 PM' },
  { id: '5', name: 'Meme Lords', sender: 'user#606', lastMessage: 'Check this hilarious meme 😂', time: 'Today' },
];

export default function MessagesScreen() {
  const router = useRouter();

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push(`/messages/chat?chatId=${item.id}`)} // ✅ Absolute path with chatId
    >
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatTime}>{item.time}</Text>
      </View>
      <Text style={styles.chatLastMessage}>
        <Text style={styles.chatSender}>{item.sender}: </Text>
        {item.lastMessage}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700' },
  chatItem: { padding: 15, backgroundColor: '#fff', borderRadius: 12, marginBottom: 10 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatName: { fontSize: 16, fontWeight: '600', color: '#333' },
  chatTime: { fontSize: 12, color: '#888' },
  chatLastMessage: { fontSize: 14, color: '#555' },
  chatSender: { fontWeight: '700', color: '#407ED1' },
  testButton: { marginTop: 20, backgroundColor: '#407ED1', padding: 12, borderRadius: 8, alignItems: 'center' },
  testButtonText: { color: '#fff', fontWeight: '700' },
});
