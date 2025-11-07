import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Chat list data
const chats = [
  { id: '1', name: 'Otaku Zone', sender: 'user#101' },
  { id: '2', name: 'Volleyball', sender: 'user#202' },
  { id: '3', name: 'Football', sender: 'user#404' },
  { id: '4', name: 'Badminton', sender: 'user#505' },
  { id: '5', name: 'Meme Lords', sender: 'user#606' },
];

// All messages store (persistent across chats)
const messagesStore: { [key: string]: any[] } = {
  '1': [
    { id: '1', sender: 'user#101', text: 'Did you watch the latest episode?', time: '10:45 AM' },
    { id: '2', sender: 'user#202', text: 'Yes! It was amazing 😍', time: '10:50 AM' },
  ],
  '2': [
    { id: '1', sender: 'user#202', text: 'Training at 5 pm today!', time: '9:30 AM' },
  ],
  '3': [
    { id: '1', sender: 'user#404', text: 'Goal celebration was epic!', time: '8:20 PM' },
    { id: '2', sender: 'user#101', text: 'I recorded it, I’ll share it!', time: '8:25 PM' },
  ],
  '4': [
    { id: '1', sender: 'Ashfaq', text: 'Let\'s play doubles tomorrow?', time: '7:15 PM' },
    { id: '2', sender: 'Sam', text: 'I am in! What time?', time: '7:20 PM' },
    { id: '3', sender: 'Ashfaq', text: 'Can join after 6 pm.', time: '7:22 PM' },
    { id: '4', sender: 'Sam', text: 'Perfect, see you then!', time: '7:25 PM' },
    { id: '5', sender: 'Sai', text: 'Bro I beat you 21-11 in doubles 🤣🤣', time: '7:30 PM' },
    { id: '6', sender: 'Ashfaq', text: 'Bro, that was luck! 😤', time: '7:31 PM' },
    { id: '7', sender: 'Sai', text: 'Haha no way! Rematch next time! 🤣', time: '7:32 PM' },
  ],
  '5': [
    { id: '1', sender: 'AnonChihuahua', text: 'Check this hilarious meme 😂', time: '6:59 PM' },
    { id: '2', sender: 'SecretPenguin42', text: '😂😂 I can’t stop laughing', time: '7:13 PM' },
    { id: '3', sender: 'MysteryHamster', text: 'This one slaps!', time: '7:20 PM' },
    { id: '4', sender: 'AnonNoodle', text: 'Lol I showed it to my friend 🤣', time: '7:22 PM' },
  ],
};

export default function ChatScreen() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState(messagesStore[chatId] || []);
  const [newMessage, setNewMessage] = useState('');
  const [participantsModalVisible, setParticipantsModalVisible] = useState(false);

  const currentChat = chats.find(chat => chat.id === chatId);
  const chatName = currentChat ? currentChat.name : 'Chat';

  const participants = Array.from(new Set(messages.map(msg => msg.sender)));

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: (messages.length + 1).toString(),
      sender: 'user#202', // "me"
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    messagesStore[chatId] = updatedMessages;
    setNewMessage('');

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 50);
  };

  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 50);
  }, []);

  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageItem, item.sender === 'user#202' && styles.myMessageItem]}>
      <Text style={[styles.messageSender, item.sender === 'user#202' && styles.myMessageSender]}>
        {item.sender}:
      </Text>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#407ED1" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{chatName}</Text>

        <TouchableOpacity onPress={() => setParticipantsModalVisible(true)}>
          <Ionicons name="people" size={24} color="#407ED1" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput  
          placeholder="Type a message..."
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Participants Modal */}
      <Modal
        visible={participantsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setParticipantsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Participants</Text>
            <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
              {participants.map((p, i) => (
                <View key={i} style={styles.participantRow}>
                  <View style={styles.participantAvatar}>
                    <Text style={styles.participantAvatarText}>{p[0]}</Text>
                  </View>
                  <Text style={styles.participantName}>{p}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setParticipantsModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: '#407ED1', marginLeft: 6, fontSize: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  messageItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageSender: { fontWeight: '700', color: '#407ED1', marginBottom: 2 },
  messageText: { fontSize: 14, color: '#333' },
  messageTime: { fontSize: 12, color: '#888', marginTop: 2, alignSelf: 'flex-end' },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: { flex: 1, padding: 12, backgroundColor: '#F0F0F0', borderRadius: 25, fontSize: 14 },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#407ED1',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myMessageItem: { backgroundColor: '#E1F5FE', alignSelf: 'flex-end' },
  myMessageSender: { color: '#0288D1' },

  /* Participants Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  participantRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  participantAvatarText: { color: '#407ED1', fontWeight: '700' },
  participantName: { fontSize: 16, color: '#333' },
  closeButton: {
    marginTop: 12,
    backgroundColor: '#407ED1',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});
