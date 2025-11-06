import { useState } from 'react';
import { useRouter } from 'expo-router';
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

const initialProjects = [
  { id: '1', title: 'AI-based Attendance System', postedBy: 'User#104', description: 'Tracks student attendance using facial recognition.', skills: 'Python, OpenCV, ML' },
  { id: '2', title: 'Food Waste Management App', postedBy: 'User#237', description: 'Connects restaurants with NGOs to reduce food waste.', skills: 'React Native, Firebase' },
  { id: '3', title: 'Blockchain Voting System', postedBy: 'User#351', description: 'Secure and transparent blockchain-based voting platform.', skills: 'Solidity, Web3.js' },
  { id: '4', title: 'Smart Campus Navigation', postedBy: 'User#482', description: 'Indoor navigation for students and visitors using BLE.', skills: 'IoT, React Native' },
  { id: '5', title: 'Mental Health Support Bot', postedBy: 'User#596', description: 'Anonymous chatbot providing mental health support.', skills: 'AI, NLP, Python' },
  { id: '6', title: 'IoT Smart Garden', postedBy: 'User#712', description: 'Automated irrigation system using IoT sensors.', skills: 'Arduino, IoT, Cloud' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [offerPayment, setOfferPayment] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [deadline, setDeadline] = useState('');
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const handlePost = () => {
    if (!title.trim()) return;
    const randomId = Math.floor(Math.random() * 1000);
    const newProject = {
      id: Date.now().toString(),
      title: title.trim(),
      postedBy: `User#${randomId}`,
      description,
      skills,
      deadline,
      amount,
    };
    setProjects([newProject, ...projects]);
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setSkills('');
    setDeadline('');
    setAmount('');
    setOfferPayment(false);
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'Peers') router.push('/peers');
    if (tab === 'Messages') router.push('/messages');
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setDetailsVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CampusVoice</Text>
          <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
        </View>

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

        {/* Project List */}
        {projects.map((item) => (
          <TouchableOpacity key={item.id} style={styles.projectCard} onPress={() => openProjectDetails(item)}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text style={styles.projectPoster}>by {item.postedBy}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Post a New Project / Help Request</Text>
        </TouchableOpacity>
      </ScrollView>

            {/* --- PROJECT DETAILS MODAL --- */}
      {/* --- PROJECT DETAILS MODAL --- */}
      <Modal visible={detailsVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { padding: 20 }]}>
            {selectedProject && (
              <>
                <Text style={styles.modalTitle}>{selectedProject.title}</Text>
                <Text style={styles.detailText}>Posted by: {selectedProject.postedBy}</Text>
                <Text style={styles.detailText}>Description: {selectedProject.description}</Text>
                <Text style={styles.detailText}>Skills: {selectedProject.skills}</Text>
                {selectedProject.deadline && (
                  <Text style={styles.detailText}>Deadline: {selectedProject.deadline}</Text>
                )}
                {selectedProject.amount && (
                  <Text style={styles.detailText}>Payment: {selectedProject.amount}</Text>
                )}

                {/* --- Buttons for Help / Cancel --- */}
                <View style={[styles.modalButtons, { justifyContent: 'space-between' }]}>
                  <TouchableOpacity
                    style={[
                      styles.postButton,
                      { backgroundColor: '#4CAF50', flex: 1, marginRight: 10 },
                    ]}
                    onPress={() => {
                      setDetailsVisible(false);
                      alert('You offered to help this project!');
                    }}
                  >
                    <Text style={styles.postText}>Help</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.postButton,
                      { backgroundColor: '#E53935', flex: 1 },
                    ]}
                    onPress={() => setDetailsVisible(false)}
                  >
                    <Text style={styles.postText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      {/* --- POST NEW PROJECT MODAL --- */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Post a New Project / Help Request</Text>

            <TextInput
              placeholder="Project Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { height: 80 }]}
              multiline
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Skills Required"
              value={skills}
              onChangeText={setSkills}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Deadline (optional)"
              value={deadline}
              onChangeText={setDeadline}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <View style={styles.paymentRow}>
              <Text style={styles.paymentText}>Offer Payment?</Text>
              <Switch value={offerPayment} onValueChange={setOfferPayment} />
            </View>

            {offerPayment && (
              <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
            )}

            {/* Buttons */}
            <View style={[styles.modalButtons, { justifyContent: 'space-between' }]}>
              <TouchableOpacity
                style={[styles.postButton, { backgroundColor: '#E53935', flex: 1, marginRight: 10 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.postText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.postButton, { backgroundColor: '#4CAF50', flex: 1 }]}
                onPress={handlePost}
              >
                <Text style={styles.postText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Home')}>
          <Ionicons name="home" size={24} color={activeTab === 'Home' ? '#407ED1' : '#1A1A1A'} />
          <Text style={activeTab === 'Home' ? styles.navTextActive : styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Peers')}>
          <Ionicons name="people-outline" size={24} color={activeTab === 'Peers' ? '#407ED1' : '#1A1A1A'} />
          <Text style={activeTab === 'Peers' ? styles.navTextActive : styles.navText}>Peers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('Messages')}>
          <Ionicons name="chatbubble-outline" size={24} color={activeTab === 'Messages' ? '#407ED1' : '#1A1A1A'} />
          <Text style={activeTab === 'Messages' ? styles.navTextActive : styles.navText}>Messages</Text>
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
