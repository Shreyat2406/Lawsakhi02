import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import FloatingSOSButton from '@/components/FloatingSOSButton';

const { width } = Dimensions.get('window');

export default function Homepage() {
  const navigateToExplore = () => {
    router.push('/explore');
  };

  const navigateToWomensCorner = () => {
    router.push('/womens-corner');
  };

  const navigateToAbout = () => {
    router.push('/about');
  };

  const navigateToContact = () => {
    router.push('/contact');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>LawSakhi</Text>
          <Text style={styles.headerSubtitle}>
            Your Legal Guide & Safety Companion
          </Text>
        </View>

        {/* Navigation Cards */}
        <View style={styles.navSection}>
          <TouchableOpacity style={styles.navCard} onPress={navigateToAbout}>
            <Ionicons name="information-circle" size={24} color="#081C30" />
            <Text style={styles.navCardText}>About Us</Text>
            <Ionicons name="chevron-forward" size={20} color="#081C30" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navCard} onPress={navigateToExplore}>
            <Ionicons name="compass" size={24} color="#081C30" />
            <Text style={styles.navCardText}>Explore</Text>
            <Ionicons name="chevron-forward" size={20} color="#081C30" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navCard} onPress={navigateToContact}>
            <Ionicons name="mail" size={24} color="#081C30" />
            <Text style={styles.navCardText}>Contact Us</Text>
            <Ionicons name="chevron-forward" size={20} color="#081C30" />
          </TouchableOpacity>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={navigateToExplore}>
            <Ionicons name="book" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Explore Laws</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={navigateToWomensCorner}>
            <Ionicons name="shield-checkmark" size={24} color="#081C30" />
            <Text style={styles.secondaryButtonText}>Women's Corner</Text>
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="document-text" size={32} color="#081C30" />
              <Text style={styles.featureTitle}>IPC Sections</Text>
              <Text style={styles.featureDescription}>
                Learn about Indian Penal Code sections
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="chatbubble-ellipses" size={32} color="#081C30" />
              <Text style={styles.featureTitle}>AI Assistant</Text>
              <Text style={styles.featureDescription}>
                Get instant legal guidance
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="flag" size={32} color="#081C30" />
              <Text style={styles.featureTitle}>Report</Text>
              <Text style={styles.featureDescription}>
                Anonymous reporting system
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureCard}>
              <Ionicons name="people" size={32} color="#081C30" />
              <Text style={styles.featureTitle}>Support</Text>
              <Text style={styles.featureDescription}>
                Mental health support forum
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Info */}
        <View style={styles.emergencyInfo}>
          <Ionicons name="warning" size={24} color="#FF4C4C" />
          <Text style={styles.emergencyText}>
            In case of emergency, use the SOS button for immediate help
          </Text>
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
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  navSection: {
    padding: 20,
    gap: 12,
  },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  navCardText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#081C30',
  },
  actionSection: {
    padding: 20,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#081C30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#081C30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 12,
  },
  secondaryButtonText: {
    color: '#081C30',
    fontSize: 18,
    fontWeight: '600',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#081C30',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: (width - 56) / 2, // 2 cards per row with proper spacing
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#081C30',
    marginTop: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  emergencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  emergencyText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100, // Space for floating SOS button
  },
});