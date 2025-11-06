import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Initial sample data
const initialProjects = [
  { id: '1', title: 'AI-based Attendance System', postedBy: 'User#104' },
  { id: '2', title: 'Food Waste Management App', postedBy: 'User#237' },
  { id: '3', title: 'Blockchain Voting System', postedBy: 'User#351' },
  { id: '4', title: 'Smart Campus Navigation', postedBy: 'User#482' },
  { id: '5', title: 'Mental Health Support Bot', postedBy: 'User#596' },
  { id: '6', title: 'IoT Smart Garden', postedBy: 'User#712' },
];

export default function DashboardScreen() {
  const [projects, setProjects] = useState(initialProjects);
  const [modalVisible, setModalVisible] = useState(false);
  const [offerPayment, setOfferPayment] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [deadline, setDeadline] = useState('');
  const [amount, setAmount] = useState('');

  const handlePost = () => {
    if (!title.trim()) return; // Require at least title

    const randomId = Math.floor(Math.random() * 1000);
    const newProject = {
      id: Date.now().toString(),
      title: title.trim(),
      postedBy: `User#${randomId}`,
    };

    setProjects([newProject, ...projects]);
    setModalVisible(false);

    // Clear fields
    setTitle('');
    setDescription('');
    setSkills('');
    setDeadline('');
    setAmount('');
    setOfferPayment(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CampusVoice</Text>
          <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>
          Find peers to collaborate with or share your projects anonymously
        </Text>

        {/* Projects Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Projects</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Projects List */}
        {projects.map((item) => (
          <View key={item.id} style={styles.projectCard}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text style={styles.projectPoster}>by {item.postedBy}</Text>
          </View>
        ))}

        {/* Add new project button */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Post a New Project / Help Request</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ---------- POP-UP MODAL ---------- */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>New Project / Help Request</Text>

            <TextInput
              placeholder="Project Title"
              style={styles.input}
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Description or what you need help with"
              style={[styles.input, { height: 80 }]}
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TextInput
              placeholder="Skills required (e.g., Python, Design, AI)"
              style={styles.input}
              placeholderTextColor="#888"
              value={skills}
              onChangeText={setSkills}
            />
            <TextInput
              placeholder="Deadline (optional)"
              style={styles.input}
              placeholderTextColor="#888"
              value={deadline}
              onChangeText={setDeadline}
            />

            {/* Offer Payment */}
            <View style={styles.paymentRow}>
              <Text style={styles.paymentText}>Offering payment?</Text>
              <Switch value={offerPayment} onValueChange={setOfferPayment} />
            </View>

            {offerPayment && (
              <TextInput
                placeholder="Amount (AED/USD)"
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#888"
                value={amount}
                onChangeText={setAmount}
              />
            )}

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                <Text style={styles.postText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#407ED1" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="people-outline" size={24} color="#1A1A1A" />
          <Text style={styles.navText}>Peers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#1A1A1A" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#39ACB5',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: 14,
    color: '#407ED1',
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  projectPoster: {
    fontSize: 13,
    color: '#888',
    marginTop: 5,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#407ED1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#1A1A1A',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#407ED1',
    marginTop: 4,
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
    color: '#1A1A1A',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  paymentText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  cancelButton: {
    marginRight: 15,
  },
  cancelText: {
    color: '#888',
    fontSize: 15,
  },
  postButton: {
    backgroundColor: '#407ED1',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  postText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
