import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Chat list data to look up chat name
const chats = [
  { id: '1', name: 'Otaku Zone', sender: 'user#101', lastMessage: 'Did you watch the latest episode?', time: '10:45 AM' },
  { id: '2', name: 'Volleyball', sender: 'user#202', lastMessage: 'Training at 5 pm today!', time: '9:30 AM' },
  { id: '3', name: 'Football', sender: 'user#404', lastMessage: 'Goal celebration was epic!', time: '8:20 PM' },
  { id: '4', name: 'Badminton', sender: 'user#505', lastMessage: 'Let\'s play doubles tomorrow?', time: '7:15 PM' },
  { id: '5', name: 'Meme Lords', sender: 'user#606', lastMessage: 'Check this hilarious meme 😂', time: 'Today' },
];

// All messages with more entries
const allMessages = {
  '1': [
    { id: '1', sender: 'user#101', text: 'Did you watch the latest episode?', time: '10:45 AM' },
    { id: '2', sender: 'user#202', text: 'Yes! It was amazing 😍', time: '10:50 AM' },
    { id: '3', sender: 'user#101', text: 'I loved the twist at the end!', time: '10:52 AM' },
    { id: '4', sender: 'user#202', text: 'Same here! Can’t wait for the next one.', time: '10:55 AM' },
  ],
  '2': [
    { id: '1', sender: 'user#202', text: 'Training at 5 pm today!', time: '9:30 AM' },
    { id: '2', sender: 'user#101', text: 'Got it, see you there!', time: '9:35 AM' },
  ],
  '3': [
    { id: '1', sender: 'user#404', text: 'Goal celebration was epic!', time: '8:20 PM' },
    { id: '2', sender: 'user#101', text: 'I recorded it, I’ll share it!', time: '8:25 PM' },
  ],
  '4': [
    { id: '1', sender: 'user#505', text: 'Let\'s play doubles tomorrow?', time: '7:15 PM' },
    { id: '2', sender: 'user#606', text: 'I am in! What time?', time: '7:20 PM' },
    { id: '3', sender: 'user#707', text: 'Can join after 6 pm.', time: '7:22 PM' },
    { id: '4', sender: 'user#505', text: 'Perfect, see you then!', time: '7:25 PM' },
  ],
  '5': [
    { id: '1', sender: 'user#606', text: 'Check this hilarious meme 😂', time: 'Today' },
    { id: '2', sender: 'user#101', text: '😂😂 I can’t stop laughing', time: 'Today' },
  ],
};

export default function ChatScreen() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams(); // ✅ Correct for Expo Router

  const [messages, setMessages] = useState(allMessages[chatId] || []);
  const [newMessage, setNewMessage] = useState('');

  const currentChat = chats.find(chat => chat.id === chatId);
  const chatName = currentChat ? currentChat.name : 'Chat';

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: (messages.length + 1).toString(),
      sender: 'user#202', // assuming this is "me"
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#407ED1" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{chatName}</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      />

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
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
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#407ED1',
    marginLeft: 6,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
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
  messageSender: {
    fontWeight: '700',
    color: '#407ED1',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#407ED1',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myMessageItem: {
    backgroundColor: '#E1F5FE',
    alignSelf: 'flex-end',
  },
  myMessageSender: {
    color: '#0288D1',
  },
});
