import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import * as SMS from 'expo-sms';
import ipcSectionsData from '../data/ipcSections.json';

const { width } = Dimensions.get('window');

interface IPCSection {
  id: number;
  section: string;
  title: string;
  description: string;
}

interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

const Explore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ipc');
  const [ipcSections, setIpcSections] = useState<IPCSection[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [sosModalVisible, setSosModalVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const YOUTUBE_API_KEY = 'YOUR_API_KEY'; // Replace with actual API key

  useEffect(() => {
    // Load IPC sections from JSON
    setIpcSections(ipcSectionsData);
  }, []);

  useEffect(() => {
    if (activeTab === 'videos') {
      fetchYouTubeVideos();
    }
  }, [activeTab]);

  const fetchYouTubeVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=women+safety+laws+india&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      if (data.items) {
        setVideos(data.items);
      }
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      Alert.alert('Error', 'Failed to load videos. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Report from ${formData.name}`,
          body: formData.message,
          userId: 1,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your report has been submitted successfully!');
        setFormData({ name: '', message: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    }
  };

  const openYouTubeVideo = (videoId: string) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(url);
  };

  const startSOSCountdown = () => {
    setSosModalVisible(true);
    setCountdown(10);
    setCountdownActive(true);
    
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
          }
          setCountdownActive(false);
          sendSOSAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSOS = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setCountdownActive(false);
    setSosModalVisible(false);
    setCountdown(10);
  };

  const sendSOSAlert = async () => {
    setSosModalVisible(false);
    
    const emergencyContacts = ['1234567890', '9876543210'];
    const message = '🚨 SOS Alert from LawSakhi! I need help. My location: [dummy location: New Delhi, India]';

    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(emergencyContacts, message);
        Alert.alert('SOS Alert Sent!', '🚨 Emergency SMS sent to your registered contacts.');
      } else {
        Alert.alert('SMS Not Available', 'SMS service is not available on this device.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert('Error', 'Failed to send SOS alert. Please try again.');
    }
  };

  const renderIPCLaws = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Indian Penal Code Sections</Text>
      {ipcSections.map((section) => (
        <View key={section.id} style={styles.ipcCard}>
          <View style={styles.ipcHeader}>
            <Text style={styles.ipcSection}>Section {section.section}</Text>
          </View>
          <Text style={styles.ipcTitle}>{section.title}</Text>
          <Text style={styles.ipcDescription}>{section.description}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderAwarenessVideos = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Women Safety Awareness Videos</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading videos...</Text>
      ) : (
        videos.map((video) => (
          <TouchableOpacity
            key={video.id.videoId}
            style={styles.videoCard}
            onPress={() => openYouTubeVideo(video.id.videoId)}
          >
            <Image
              source={{ uri: video.snippet.thumbnails.medium.url }}
              style={styles.videoThumbnail}
            />
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {video.snippet.title}
              </Text>
              <Text style={styles.videoDescription} numberOfLines={3}>
                {video.snippet.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  const renderReportIssue = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Report an Issue</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Name</Text>
        <TextInput
          style={styles.formInput}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter your name"
          placeholderTextColor="#999"
        />
        
        <Text style={styles.formLabel}>Message</Text>
        <TextInput
          style={[styles.formInput, styles.messageInput]}
          value={formData.message}
          onChangeText={(text) => setFormData({ ...formData, message: text })}
          placeholder="Describe the issue..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderWomensCorner = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Women's Corner</Text>
      <View style={styles.comingSoonContainer}>
        <Text style={styles.comingSoonText}>
          Chatbot & Voice Assistant coming soon.
        </Text>
        <Text style={styles.comingSoonSubtext}>
          We're working on advanced AI features to provide personalized legal assistance.
        </Text>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ipc':
        return renderIPCLaws();
      case 'videos':
        return renderAwarenessVideos();
      case 'report':
        return renderReportIssue();
      case 'womens':
        return renderWomensCorner();
      default:
        return renderIPCLaws();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ipc' && styles.activeTab]}
            onPress={() => setActiveTab('ipc')}
          >
            <Text style={[styles.tabText, activeTab === 'ipc' && styles.activeTabText]}>
              IPC Laws
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
            onPress={() => setActiveTab('videos')}
          >
            <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>
              Awareness Videos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'report' && styles.activeTab]}
            onPress={() => setActiveTab('report')}
          >
            <Text style={[styles.tabText, activeTab === 'report' && styles.activeTabText]}>
              Report Issue
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'womens' && styles.activeTab]}
            onPress={() => setActiveTab('womens')}
          >
            <Text style={[styles.tabText, activeTab === 'womens' && styles.activeTabText]}>
              Women's Corner
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={[styles.footerText, styles.activeFooterText]}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Floating SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={startSOSCountdown}>
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>

      {/* SOS Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={sosModalVisible}
        onRequestClose={cancelSOS}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⚠️ SOS Alert</Text>
            <Text style={styles.modalMessage}>
              Hold on! Your SOS alert will be sent in {countdown}s.
            </Text>
            <Text style={styles.modalSubMessage}>
              Tap cancel if not needed.
            </Text>
            
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>
            
            <TouchableOpacity style={styles.cancelButton} onPress={cancelSOS}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#081C30',
    textAlign: 'center',
  },
  tabContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#081C30',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 20,
  },
  ipcCard: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#081C30',
  },
  ipcHeader: {
    marginBottom: 10,
  },
  ipcSection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#081C30',
  },
  ipcTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  ipcDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoThumbnail: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  videoDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  formContainer: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 10,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081C30',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#081C30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#081C30',
    textAlign: 'center',
    marginBottom: 10,
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  activeFooterText: {
    color: '#081C30',
    fontWeight: '600',
  },
  sosButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF4C4C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4C4C',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalSubMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  countdownContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF4C4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF4C4C',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  cancelButtonText: {
    color: '#FF4C4C',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Explore;