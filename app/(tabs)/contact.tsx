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

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Simulate form submission
    console.log('Contact form submitted:', form);
    
    Alert.alert(
      'Message Sent!', 
      'Thank you for contacting us. We will get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => {
        setForm({ name: '', email: '', subject: '', message: '' });
      }}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <Text style={styles.headerSubtitle}>
            We're here to help and answer any questions
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="mail" size={24} color="#081C30" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Email Us</Text>
              <Text style={styles.infoText}>support@lawsakhi.com</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="call" size={24} color="#081C30" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Call Us</Text>
              <Text style={styles.infoText}>+91 98765 43210</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="time" size={24} color="#081C30" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Working Hours</Text>
              <Text style={styles.infoText}>Mon - Fri: 9:00 AM - 6:00 PM</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="location" size={24} color="#081C30" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Office Address</Text>
              <Text style={styles.infoText}>
                123 Legal Avenue, Justice City, India - 110001
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Send us a Message</Text>
          <View style={styles.formCard}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name *</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(text) => setForm({...form, name: text})}
                placeholder="Your full name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={(text) => setForm({...form, email: text})}
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                value={form.subject}
                onChangeText={(text) => setForm({...form, subject: text})}
                placeholder="What is this about?"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={form.message}
                onChangeText={(text) => setForm({...form, message: text})}
                placeholder="Tell us how we can help you..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>How can I report an incident anonymously?</Text>
            <Text style={styles.faqAnswer}>
              Go to Women's Corner > Report tab. All reports are completely anonymous and encrypted.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Is the legal information up to date?</Text>
            <Text style={styles.faqAnswer}>
              Yes, our legal database is regularly updated by certified legal experts and reviewed quarterly.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>How does the SOS feature work?</Text>
            <Text style={styles.faqAnswer}>
              The SOS button sends your location to registered emergency contacts and authorities within seconds.
            </Text>
          </View>

          <View style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Can I get professional legal advice?</Text>
            <Text style={styles.faqAnswer}>
              Our AI assistant provides general guidance. For specific cases, we can connect you with legal professionals.
            </Text>
          </View>
        </View>

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
  scrollView: {
    flex: 1,
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
  infoSection: {
    padding: 20,
    gap: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081C30',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  formSection: {
    padding: 20,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
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
    color: '#333',
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
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  faqSection: {
    padding: 20,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 16,
  },
  faqCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#081C30',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100,
  },
});