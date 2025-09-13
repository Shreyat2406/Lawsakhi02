import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingSOSButton from '@/components/FloatingSOSButton';

export default function AboutUs() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About LawSakhi</Text>
          <Text style={styles.headerSubtitle}>
            Empowering through Legal Awareness
          </Text>
        </View>

        {/* Mission Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="target" size={24} color="#081C30" />
            <Text style={styles.cardTitle}>Our Mission</Text>
          </View>
          <Text style={styles.cardContent}>
            LawSakhi aims to bridge the gap between legal knowledge and the common citizen, 
            with a special focus on women's safety and empowerment. We believe that everyone 
            deserves access to legal information in a simple, understandable format.
          </Text>
        </View>

        {/* Vision Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="eye" size={24} color="#081C30" />
            <Text style={styles.cardTitle}>Our Vision</Text>
          </View>
          <Text style={styles.cardContent}>
            To create a society where every individual, especially women, is aware of their 
            legal rights and has easy access to justice and support systems. We envision a 
            future where legal literacy is as fundamental as basic education.
          </Text>
        </View>

        {/* Purpose Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#081C30" />
            <Text style={styles.cardTitle}>Our Purpose</Text>
          </View>
          <Text style={styles.cardContent}>
            LawSakhi serves as your digital companion in understanding Indian laws, 
            particularly those related to women's rights and safety. We provide:
          </Text>
          <View style={styles.purposeList}>
            <Text style={styles.purposeItem}>• Simplified legal information</Text>
            <Text style={styles.purposeItem}>• Emergency support systems</Text>
            <Text style={styles.purposeItem}>• Anonymous reporting mechanisms</Text>
            <Text style={styles.purposeItem}>• Mental health support resources</Text>
            <Text style={styles.purposeItem}>• AI-powered legal guidance</Text>
          </View>
        </View>

        {/* Features Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="star" size={24} color="#081C30" />
            <Text style={styles.cardTitle}>Key Features</Text>
          </View>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="book" size={20} color="#081C30" />
              <Text style={styles.featureText}>Comprehensive IPC sections database</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#081C30" />
              <Text style={styles.featureText}>AI-powered legal chatbot</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="warning" size={20} color="#FF4C4C" />
              <Text style={styles.featureText}>Emergency SOS system</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="flag" size={20} color="#081C30" />
              <Text style={styles.featureText}>Anonymous reporting platform</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="heart" size={20} color="#081C30" />
              <Text style={styles.featureText}>Mental health support forum</Text>
            </View>
          </View>
        </View>

        {/* Team Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="people" size={24} color="#081C30" />
            <Text style={styles.cardTitle}>Our Commitment</Text>
          </View>
          <Text style={styles.cardContent}>
            LawSakhi is developed by a team of legal experts, technologists, and social 
            activists committed to making legal information accessible to all. We work 
            continuously to update our content and improve our services based on user feedback 
            and changing legal landscapes.
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
  card: {
    backgroundColor: '#F8F9FA',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#081C30',
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  purposeList: {
    marginTop: 16,
    gap: 8,
  },
  purposeItem: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 100,
  },
});