import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingSOSButton from '@/components/FloatingSOSButton';
import { ipcSections } from '@/data/ipcData';
import ChatbotModal from '@/components/ChatbotModal';

export default function Explore() {
  const [activeTab, setActiveTab] = useState('ipc');
  const [chatbotVisible, setChatbotVisible] = useState(false);

  const renderIPCSections = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Indian Penal Code Sections</Text>
      {ipcSections.map((section) => (
        <View key={section.id} style={styles.ipcCard}>
          <View style={styles.ipcHeader}>
            <Text style={styles.ipcNumber}>Section {section.number}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: section.color }]}>
              <Text style={styles.categoryText}>{section.category}</Text>
            </View>
          </View>
          <Text style={styles.ipcTitle}>{section.title}</Text>
          <Text style={styles.ipcDescription}>{section.description}</Text>
          <View style={styles.ipcDetails}>
            <Text style={styles.detailLabel}>Punishment:</Text>
            <Text style={styles.detailText}>{section.punishment}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderLawsAndVideos = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Simplified Laws & Awareness</Text>
      
      <TouchableOpacity style={styles.videoCard}>
        <Ionicons name="play-circle" size={48} color="#081C30" />
        <View style={styles.videoContent}>
          <Text style={styles.videoTitle}>Understanding Women's Rights in India</Text>
          <Text style={styles.videoDescription}>Duration: 15:30</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.videoCard}>
        <Ionicons name="play-circle" size={48} color="#081C30" />
        <View style={styles.videoContent}>
          <Text style={styles.videoTitle}>Legal Procedures: Filing an FIR</Text>
          <Text style={styles.videoDescription}>Duration: 12:45</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.videoCard}>
        <Ionicons name="play-circle" size={48} color="#081C30" />
        <View style={styles.videoContent}>
          <Text style={styles.videoTitle}>Domestic Violence Laws Explained</Text>
          <Text style={styles.videoDescription}>Duration: 18:20</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.videoCard}>
        <Ionicons name="play-circle" size={48} color="#081C30" />
        <View style={styles.videoContent}>
          <Text style={styles.videoTitle}>Cyber Crime & Digital Safety</Text>
          <Text style={styles.videoDescription}>Duration: 14:15</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderChatbot = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>AI Legal Assistant</Text>
      <View style={styles.chatbotCard}>
        <Ionicons name="chatbubble-ellipses" size={48} color="#081C30" />
        <Text style={styles.chatbotTitle}>Legal Query Assistant</Text>
        <Text style={styles.chatbotDescription}>
          Ask me any legal question and get instant guidance based on Indian laws
        </Text>
        <TouchableOpacity 
          style={styles.chatbotButton}
          onPress={() => setChatbotVisible(true)}
        >
          <Text style={styles.chatbotButtonText}>Start Conversation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectionWise = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Section-wise Legal Categories</Text>
      
      <TouchableOpacity style={styles.categoryCard}>
        <Ionicons name="shield-checkmark" size={32} color="#081C30" />
        <View style={styles.categoryContent}>
          <Text style={styles.categoryTitle}>Women's Rights</Text>
          <Text style={styles.categoryDescription}>
            Specific laws protecting women's rights and safety
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#081C30" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.categoryCard}>
        <Ionicons name="home" size={32} color="#081C30" />
        <View style={styles.categoryContent}>
          <Text style={styles.categoryTitle}>Property Laws</Text>
          <Text style={styles.categoryDescription}>
            Understanding property rights and inheritance laws
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#081C30" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.categoryCard}>
        <Ionicons name="briefcase" size={32} color="#081C30" />
        <View style={styles.categoryContent}>
          <Text style={styles.categoryTitle}>Workplace Rights</Text>
          <Text style={styles.categoryDescription}>
            Employment laws and workplace harassment policies
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#081C30" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.categoryCard}>
        <Ionicons name="phone-portrait" size={32} color="#081C30" />
        <View style={styles.categoryContent}>
          <Text style={styles.categoryTitle}>Cyber Laws</Text>
          <Text style={styles.categoryDescription}>
            Digital safety and cyber crime prevention
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#081C30" />
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'ipc':
        return renderIPCSections();
      case 'videos':
        return renderLawsAndVideos();
      case 'chatbot':
        return renderChatbot();
      case 'sections':
        return renderSectionWise();
      default:
        return renderIPCSections();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Laws</Text>
        <Text style={styles.headerSubtitle}>Discover legal knowledge made simple</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ipc' && styles.activeTab]}
            onPress={() => setActiveTab('ipc')}
          >
            <Text style={[styles.tabText, activeTab === 'ipc' && styles.activeTabText]}>
              IPC Sections
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
            onPress={() => setActiveTab('videos')}
          >
            <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>
              Videos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'chatbot' && styles.activeTab]}
            onPress={() => setActiveTab('chatbot')}
          >
            <Text style={[styles.tabText, activeTab === 'chatbot' && styles.activeTabText]}>
              AI Assistant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'sections' && styles.activeTab]}
            onPress={() => setActiveTab('sections')}
          >
            <Text style={[styles.tabText, activeTab === 'sections' && styles.activeTabText]}>
              Categories
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <ChatbotModal
        visible={chatbotVisible}
        onClose={() => setChatbotVisible(false)}
      />

      <FloatingSOSButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  tabContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
  },
  activeTab: {
    backgroundColor: '#081C30',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 20,
  },
  ipcCard: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ipcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ipcNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#081C30',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ipcTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#081C30',
    marginBottom: 8,
  },
  ipcDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  ipcDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    gap: 16,
  },
  videoContent: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081C30',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
  },
  chatbotCard: {
    backgroundColor: '#F8F9FA',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  chatbotTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#081C30',
    marginTop: 16,
    marginBottom: 8,
  },
  chatbotDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  chatbotButton: {
    backgroundColor: '#081C30',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  chatbotButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    gap: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081C30',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 100,
  },
});