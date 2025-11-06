// app/messages.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#407ED1" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Messages</Text>
        <View style={{ width: 36 }} />{/* spacer to balance header */}
      </View>

      <Text style={styles.hint}>
        All your messages will appear here. Start a conversation by clicking on a peer from the Peers tab.
      </Text>

      {/* Add your message list or placeholder here */}
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No messages yet.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8', paddingTop: 50 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: '#407ED1', marginLeft: 6, fontSize: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  hint: { color: '#39ACB5', paddingHorizontal: 20, marginBottom: 10 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 },
});
