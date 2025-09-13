import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FloatingSOSButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [countdownActive, setCountdownActive] = useState(false);

  let countdownInterval: NodeJS.Timeout;

  const handleSOSPress = () => {
    setModalVisible(true);
    setCountdown(10);
    setCountdownActive(true);
    startCountdown();
  };

  const startCountdown = () => {
    countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setCountdownActive(false);
          sendSOSAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSOS = () => {
    clearInterval(countdownInterval);
    setCountdownActive(false);
    setModalVisible(false);
    setCountdown(10);
  };

  const sendSOSAlert = () => {
    setModalVisible(false);
    
    // Simulate getting location and sending alert
    const alertData = {
      timestamp: new Date().toISOString(),
      location: 'Current Location', // In real app, use expo-location
      coordinates: { lat: 28.6139, lng: 77.2090 }, // Dummy coordinates
    };

    console.log('SOS Alert sent:', alertData);

    Alert.alert(
      '🚨 SOS Alert Sent!',
      'Your alert has been sent to:\n• Police (100)\n• Registered emergency contacts\n• Location shared automatically',
      [
        {
          text: 'OK',
          onPress: () => {
            // In real app, show confirmation and next steps
          },
        },
      ]
    );
  };

  return (
    <>
      <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
        <Ionicons name="warning" size={28} color="#FFFFFF" />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelSOS}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.warningHeader}>
              <Ionicons name="warning" size={48} color="#FF4C4C" />
              <Text style={styles.modalTitle}>Emergency Alert</Text>
            </View>

            <Text style={styles.modalMessage}>
              {countdownActive 
                ? `Your SOS alert will be sent in ${countdown} seconds.`
                : 'Preparing to send alert...'
              }
            </Text>

            <Text style={styles.modalSubMessage}>
              Tap cancel if this was accidental
            </Text>

            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={cancelSOS}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.sendButton} 
                onPress={() => {
                  clearInterval(countdownInterval);
                  sendSOSAlert();
                }}
              >
                <Text style={styles.sendButtonText}>Send Now</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.alertInfo}>
              📍 Your location will be shared with authorities
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FF4C4C',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4C4C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  warningHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#081C30',
    marginTop: 12,
  },
  modalMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  modalSubMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  countdownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF4C4C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF4C4C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#FF4C4C',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButton: {
    backgroundColor: '#FF4C4C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  alertInfo: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});