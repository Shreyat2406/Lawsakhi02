import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ChatbotModal({ visible, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your legal assistant. I can help you with questions about Indian laws, women's rights, and legal procedures. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const botResponses = {
    harassment: "Sexual harassment is covered under IPC Section 354A. You can file a complaint at the nearest police station or use the online portal. Would you like to know more about the procedure?",
    dowry: "Dowry-related offenses are covered under IPC Section 498A and the Dowry Prohibition Act. These are serious crimes with imprisonment up to 3 years and fines.",
    domestic: "Domestic violence cases fall under the Protection of Women from Domestic Violence Act, 2005. You can approach a magistrate or protection officer for immediate relief.",
    rape: "IPC Sections 375-376 deal with rape. It's a serious crime with life imprisonment. Immediate medical attention and police complaint are crucial. Call 181 for women's helpline.",
    stalking: "Stalking is covered under IPC Section 354D with imprisonment up to 3 years. Document all evidence and report immediately to police.",
    rights: "Women have equal rights under the Constitution. Key rights include right to equality, property rights, right to work, and protection from discrimination.",
    default: "I understand you need legal guidance. Could you please be more specific about your legal question? I can help with topics like harassment, domestic violence, property rights, workplace issues, or general legal procedures.",
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('harassment') || message.includes('eve teasing')) {
      return botResponses.harassment;
    } else if (message.includes('dowry') || message.includes('498a')) {
      return botResponses.dowry;
    } else if (message.includes('domestic') || message.includes('violence') || message.includes('husband')) {
      return botResponses.domestic;
    } else if (message.includes('rape') || message.includes('assault') || message.includes('375') || message.includes('376')) {
      return botResponses.rape;
    } else if (message.includes('stalking') || message.includes('follow')) {
      return botResponses.stalking;
    } else if (message.includes('rights') || message.includes('property') || message.includes('inheritance')) {
      return botResponses.rights;
    } else {
      return botResponses.default;
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: generateBotResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const quickQuestions = [
    'What are women\'s rights in India?',
    'How to file a harassment complaint?',
    'Domestic violence laws',
    'Property rights for women',
    'Workplace harassment procedure',
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#081C30" />
            <Text style={styles.headerTitle}>Legal Assistant</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#081C30" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.botMessageText,
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.timestamp,
                message.isUser ? styles.userTimestamp : styles.botTimestamp,
              ]}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Quick Questions */}
        <View style={styles.quickQuestionsContainer}>
          <Text style={styles.quickQuestionsTitle}>Quick Questions:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionButton}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me about legal matters..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            💡 This is an AI assistant providing general legal information. For specific legal advice, consult a qualified lawyer.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#081C30',
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#081C30',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  userTimestamp: {
    color: '#CCCCCC',
    textAlign: 'right',
  },
  botTimestamp: {
    color: '#999',
  },
  quickQuestionsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  quickQuestionButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  quickQuestionText: {
    fontSize: 14,
    color: '#081C30',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#081C30',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  disclaimer: {
    padding: 16,
    backgroundColor: '#FFF9C4',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});