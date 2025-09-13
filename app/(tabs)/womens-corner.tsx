import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingSOSButton from '@/components/FloatingSOSButton';
import { womensIPCSections } from '@/data/womensData';

export default function WomensCorner() {
  const [activeTab, setActiveTab] = useState('sections');
  const [reportForm, setReportForm] = useState({
    incident: '',
    location: '',
    date: '',
    description: '',
    anonymous: true,
  });

  const handleSubmitReport = () => {
    if (!reportForm.incident || !reportForm.description) {
      Alert.alert('Error', 'Please fill in the required fields');
      return;
    }

    // Simulate storing to local storage
    const report = {
      ...reportForm,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    // In a real app, save to AsyncStorage
    console.log('Report submitted:', report);
    
    Alert.alert(
      'Report Submitted', 
      'Your report has been submitted anonymously. We will review it and take appropriate action.',
      [{ text: 'OK', onPress: () => {
        setReportForm({
          incident: '',
          location: '',
          date: '',
          description: '',
          anonymous: true,
        });
      }}]
    );
  };

  const renderWomensIPCSections = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Women-Specific IPC Sections</Text>
      {womensIPCSections.map((section) => (
        <View key={section.id} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>Section {section.number}</Text>
            <View style={styles.severityBadge}>
              <Text style={styles.severityText}>{section.severity}</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionDescription}>{section.description}</Text>
          <View style={styles.sectionDetails}>
            <Text style={styles.detailLabel}>Punishment:</Text>
            <Text style={styles.detailText}>{section.punishment}</Text>
            <Text style={styles.detailLabel}>How to Report:</Text>
            <Text style={styles.detailText}>{section.howToReport}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderReportingForm = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Anonymous Reporting</Text>
      <View style={styles.formCard}>
        <Text style={styles.formDescription}>
          Report incidents safely and anonymously. Your privacy is our priority.
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Type of Incident *</Text>
          <TextInput
            style={styles.input}
            value={reportForm.incident}
            onChangeText={(text) => setReportForm({...reportForm, incident: text})}
            placeholder="e.g., Harassment, Stalking, Violence"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Location (Optional)</Text>
          <TextInput
            style={styles.input}
            value={reportForm.location}
            onChangeText={(text) => setReportForm({...reportForm, location: text})}
            placeholder="General area or landmark"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date (Optional)</Text>
          <TextInput
            style={styles.input}
            value={reportForm.date}
            onChangeText={(text) => setReportForm({...reportForm, date: text})}
            placeholder="When did this occur?"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={reportForm.description}
            onChangeText={(text) => setReportForm({...reportForm, description: text})}
            placeholder="Describe what happened..."
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
          <Text style={styles.submitButtonText}>Submit Anonymous Report</Text>
        </TouchableOpacity>

        <Text style={styles.privacyNote}>
          🔒 Your report is completely anonymous and encrypted. No personal information is stored.
        </Text>
      </View>
    </View>
  );

  const renderSupportForum = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Mental Support Forum</Text>
      
      <View style={styles.supportCard}>
        <Ionicons name="heart" size={32} color="#FF4C4C" />
        <Text style={styles.supportTitle}>You're Not Alone</Text>
        <Text style={styles.supportDescription}>
          Connect with a supportive community and professional counselors
        </Text>
      </View>

      <TouchableOpacity style={styles.forumCard}>
        <View style={styles.forumHeader}>
          <Ionicons name="chatbubbles" size={24} color="#081C30" />
          <Text style={styles.forumTitle}>Support Groups</Text>
        </View>
        <Text style={styles.forumDescription}>
          Join anonymous support groups for survivors and those seeking help
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forumCard}>
        <View style={styles.forumHeader}>
          <Ionicons name="medical" size={24} color="#081C30" />
          <Text style={styles.forumTitle}>Professional Counseling</Text>
        </View>
        <Text style={styles.forumDescription}>
          Free counseling sessions with licensed mental health professionals
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forumCard}>
        <View style={styles.forumHeader}>
          <Ionicons name="book" size={24} color="#081C30" />
          <Text style={styles.forumTitle}>Self-Help Resources</Text>
        </View>
        <Text style={styles.forumDescription}>
          Guided meditation, coping strategies, and recovery resources
        </Text>
      </TouchableOpacity>

      <View style={styles.emergencyContacts}>
        <Text style={styles.emergencyTitle}>24/7 Emergency Helplines</Text>
        <View style={styles.contactItem}>
          <Text style={styles.contactName}>Women Helpline</Text>
          <Text style={styles.contactNumber}>181</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactName}>Child Helpline</Text>
          <Text style={styles.contactNumber}>1098</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.contactName}>Police</Text>
          <Text style={styles.contactNumber}>100</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'sections':
        return renderWomensIPCSections();
      case 'report':
        return renderReportingForm();
      case 'support':
        return renderSupportForum();
      default:
        return renderWomensIPCSections();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Women's Corner</Text>
        <Text style={styles.headerSubtitle}>Your safe space for legal support</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sections' && styles.activeTab]}
          onPress={() => setActiveTab('sections')}
        >
          <Text style={[styles.tabText, activeTab === 'sections' && styles.activeTabText]}>
            Legal Rights
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'report' && styles.activeTab]}
          onPress={() => setActiveTab('report')}
        >
          <Text style={[styles.tabText, activeTab === 'report' && styles.activeTabText]}>
            Report
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'support' && styles.activeTab]}
          onPress={() => setActiveTab('support')}
        >
          <Text style={[styles.tabText, activeTab === 'support' && styles.activeTabText]}>
            Support
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={styles.bottomSpacing} />
      </ScrollView>

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
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
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
  sectionCard: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4C4C',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#081C30',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FF4C4C',
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionDetails: {
    borderTopWidth: 1,
    borderTopColor: '#FFCCCC',
    paddingTop: 12,
    gap: 8,
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
    marginBottom: 8,
  },
  formCard: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
  },
  formDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081C30',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#081C30',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  supportCard: {
    backgroundColor: '#FFF5F5',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#081C30',
    marginTop: 12,
    marginBottom: 8,
  },
  supportDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  forumCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  forumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  forumTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#081C30',
  },
  forumDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emergencyContacts: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FFCCCC',
  },
  contactName: {
    fontSize: 16,
    color: '#333',
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4C4C',
  },
  bottomSpacing: {
    height: 100,
  },
});