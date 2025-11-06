// app/peers.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Person = {
  id: string;
  realName?: string; // for demo only — DON'T show this in UI
  dept?: string;
};

// Demo data: realName kept here only for your backend/dev use — UI will use aliases.
const connections: Person[] = [
  { id: 'u101', realName: 'Aisha Khan', dept: 'CSE' },
  { id: 'u202', realName: 'Mohamed Ali', dept: 'IT' },
  { id: 'u303', realName: 'Lin Wei', dept: 'ECE' },
  { id: 'u404', realName: 'Carlos M.', dept: 'Design' },
];

// Simple deterministic alias generator for demo.
// In production, use server-side keyed HMAC to avoid guessability.
function aliasFor(viewerId: string, personId: string) {
  // create a small stable number from the pair
  const seed = viewerId + '|' + personId;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const num = (h % 900) + 100; // 100-999
  const adjectives = ['Blue','Silent','Swift','Bright','Kind','Lucky','Quiet','Bold','Curious','Brave'];
  const adj = adjectives[h % adjectives.length];
  return `${adj}-${num}`; // e.g. "Silent-237"
}

export default function PeersScreen() {
  const router = useRouter();
  // In a real app, currentViewerId = auth.currentUser.id
  const currentViewerId = 'currentUser_999'; // placeholder demo viewer id

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#407ED1" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Peers</Text>
        <View style={{ width: 36 }} />{/* spacer to balance header */}
      </View>

      <Text style={styles.hint}>
        You’ll see each person with a unique alias — aliases differ per viewer to protect identity.
      </Text>

      <FlatList
        data={connections}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const alias = aliasFor(currentViewerId, item.id);
          return (
            <TouchableOpacity style={styles.card} onPress={() => {/* open chat / profile anonymously */}}>
              <View style={styles.left}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{alias.split('-')[0][0]}</Text>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.alias}>{alias}</Text>
                <Text style={styles.meta}>Connected • {item.dept}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#bbb" />
            </TouchableOpacity>
          );
        }}
      />
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: {width:0,height:1}, shadowRadius: 3, elevation: 1
  },
  left: { marginRight: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E8F4FF', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#407ED1', fontWeight: '700' },
  info: { flex: 1 },
  alias: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 13, color: '#888', marginTop: 3 },
});
