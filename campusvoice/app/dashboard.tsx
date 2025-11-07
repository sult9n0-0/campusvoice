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

const userReputations = {
  'User#204': { rating: 4.8, reviews: 12, summary: 'Great teamwork & reliable.' },
  'User#307': { rating: 4.5, reviews: 9, summary: 'Quick responder and detail-oriented.' },
  'User#152': { rating: 4.2, reviews: 6, summary: 'Helpful and polite.' },
  'User#391': { rating: 4.9, reviews: 15, summary: 'Top contributor in multiple projects.' },
};

const initialProjects = [
  { id: '1', title: 'AI-based Attendance System', postedBy: 'User#104', description: 'Tracks student attendance using facial recognition.', skills: 'Python, OpenCV, ML', helpers: [] },
  { id: '2', title: 'Food Waste Management App', postedBy: 'User#237', description: 'Connects restaurants with NGOs to reduce food waste.', skills: 'React Native, Firebase', helpers: [] },
  { id: '3', title: 'Blockchain Voting System', postedBy: 'User#351', description: 'Secure and transparent blockchain-based voting platform.', skills: 'Solidity, Web3.js', helpers: [] },
  { id: '4', title: 'Smart Campus Navigation', postedBy: 'User#482', description: 'Indoor navigation for students and visitors using BLE.', skills: 'IoT, React Native', helpers: [] },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [requestsVisible, setRequestsVisible] = useState(false);
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
      helpers: [],
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

  const handleOfferHelp = (projectId) => {
    const randomUser = `User#${Math.floor(Math.random() * 500)}`;
    const updated = projects.map((p) =>
      p.id === projectId && !p.helpers.includes(randomUser)
        ? { ...p, helpers: [...p.helpers, randomUser] }
        : p
    );
    setProjects(updated);
    setDetailsVisible(false);
    alert('You offered to help this project!');
  };

    const handleDecision = (user, decision) => {
    alert(
      decision === 'accept'
        ? `You accepted ${user} as a helper.`
        : `You rejected ${user}'s request.`
    );

    const updatedProjects = projects.map((p) =>
      p.id === selectedProject.id
        ? { ...p, helpers: p.helpers.filter((h) => h !== user) }
        : p
    );

    // update the main list
    setProjects(updatedProjects);

    // update currently open project (so modal updates immediately)
    const updatedProject = updatedProjects.find(p => p.id === selectedProject.id);
    setSelectedProject(updatedProject);
  };
  const handleViewRequests = (project) => {
  setSelectedProject(project); // set the project whose helpers you want to see
  setRequestsVisible(true);    // show the helpers modal
};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>CampusVoice</Text>
          <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
        </View>

        <Text style={styles.greeting}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>
          Find peers to collaborate with or share your projects anonymously
        </Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Projects</Text>
        </View>

        {projects.map((item) => (
          <TouchableOpacity key={item.id} style={styles.projectCard} onPress={() => openProjectDetails(item)}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text style={styles.projectPoster}>by {item.postedBy}</Text>
            {item.helpers.length > 0 && (
              <TouchableOpacity onPress={() => handleViewRequests(item)}>
                <Text style={styles.helperNotice}>{item.helpers.length} people offered to help</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Post a New Project / Help Request</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* PROJECT DETAILS MODAL */}
      <Modal visible={detailsVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { padding: 20 }]}>
            {selectedProject && (
              <>
                <Text style={styles.modalTitle}>{selectedProject.title}</Text>
                <Text style={styles.detailText}>Posted by: {selectedProject.postedBy}</Text>
                <Text style={styles.detailText}>Description: {selectedProject.description}</Text>
                <Text style={styles.detailText}>Skills: {selectedProject.skills}</Text>

                {selectedProject.deadline && <Text style={styles.detailText}>Deadline: {selectedProject.deadline}</Text>}
                {selectedProject.amount && <Text style={styles.detailText}>Payment: {selectedProject.amount}</Text>}

                <View style={[styles.modalButtons, { justifyContent: 'space-between' }]}>
                  <TouchableOpacity
                    style={[styles.postButton, { backgroundColor: '#4CAF50', flex: 1, marginRight: 10 }]}
                    onPress={() => handleOfferHelp(selectedProject.id)}
                  >
                    <Text style={styles.postText}>Help</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.postButton, { backgroundColor: '#E53935', flex: 1 }]}
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

      {/* HELP REQUESTS MODAL */}
      <Modal visible={requestsVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { maxHeight: '70%' }]}>
            <Text style={styles.modalTitle}>Helpers for {selectedProject?.title}</Text>

            <ScrollView>
              {selectedProject?.helpers.length ? (
                selectedProject.helpers.map((helper) => (
                  <View key={helper} style={styles.helperCard}>
                    <View>
                      <Text style={styles.helperName}>{helper}</Text>
                      <Text style={styles.helperDetail}>
                        ⭐ {userReputations[helper]?.rating || '4.0'} ({userReputations[helper]?.reviews || '0'} reviews)
                      </Text>
                      <Text style={styles.helperSummary}>{userReputations[helper]?.summary || 'No summary available.'}</Text>
                    </View>
                    <View style={styles.helperButtons}>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                        onPress={() => handleDecision(helper, 'accept')}
                      >
                        <Ionicons name="checkmark" size={20} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: '#E53935' }]}
                        onPress={() => handleDecision(helper, 'reject')}
                      >
                        <Ionicons name="close" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noHelpers}>No helpers yet.</Text>
              )}
            </ScrollView>

            <TouchableOpacity
              style={[styles.postButton, { backgroundColor: '#1A1A1A', marginTop: 10 }]}
              onPress={() => setRequestsVisible(false)}
            >
              <Text style={styles.postText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* POST NEW PROJECT MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Post a New Project / Help Request</Text>
            <TextInput placeholder="Project Title" value={title} onChangeText={setTitle} style={styles.input} placeholderTextColor="#888" />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 80 }]} multiline placeholderTextColor="#888" />
            <TextInput placeholder="Skills Required" value={skills} onChangeText={setSkills} style={styles.input} placeholderTextColor="#888" />
            <TextInput placeholder="Deadline (optional)" value={deadline} onChangeText={setDeadline} style={styles.input} placeholderTextColor="#888" />

            <View style={styles.paymentRow}>
              <Text style={styles.paymentText}>Offer Payment?</Text>
              <Switch value={offerPayment} onValueChange={setOfferPayment} />
            </View>

            {offerPayment && (
              <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} style={styles.input} placeholderTextColor="#888" keyboardType="numeric" />
            )}

            <View style={[styles.modalButtons, { justifyContent: 'space-between' }]}>
              <TouchableOpacity style={[styles.postButton, { backgroundColor: '#E53935', flex: 1, marginRight: 10 }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.postText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.postButton, { backgroundColor: '#4CAF50', flex: 1 }]} onPress={handlePost}>
                <Text style={styles.postText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Nav */}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  greeting: { fontSize: 18, marginTop: 10 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600' },
  projectCard: { backgroundColor: '#F7F7F7', borderRadius: 12, padding: 15, marginVertical: 8 },
  projectTitle: { fontSize: 16, fontWeight: '600' },
  projectPoster: { fontSize: 13, color: '#666' },
  helperNotice: { color: '#407ED1', marginTop: 5, fontWeight: '500' },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#407ED1', padding: 14, borderRadius: 12, justifyContent: 'center', marginTop: 20 },
  addButtonText: { color: '#fff', fontWeight: '600', marginLeft: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  detailText: { marginVertical: 3 },
  modalButtons: { flexDirection: 'row', marginTop: 15 },
  postButton: { padding: 12, borderRadius: 10, alignItems: 'center' },
  postText: { color: '#fff', fontWeight: '600' },
  input: { backgroundColor: '#F3F3F3', borderRadius: 10, padding: 10, marginVertical: 8, color: '#000' },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  paymentText: { fontSize: 15, fontWeight: '500' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: '#444' },
  navTextActive: { fontSize: 12, color: '#407ED1', fontWeight: '600' },
  helperCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7F7F7', padding: 12, borderRadius: 10, marginVertical: 6 },
  helperName: { fontWeight: 'bold' },
  helperDetail: { fontSize: 13, color: '#666' },
  helperSummary: { fontSize: 12, color: '#777', marginTop: 2 },
  helperButtons: { flexDirection: 'row' },
  actionButton: { marginLeft: 8, padding: 8, borderRadius: 8 },
  noHelpers: { textAlign: 'center', color: '#999', marginTop: 20 },
});
