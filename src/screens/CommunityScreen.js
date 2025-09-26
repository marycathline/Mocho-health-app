import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

// Mock chat data
const mockMessages = {
  group: [
    {
      id: 1,
      user: 'Amina K.',
      message: 'Hi everyone! I\'m new here. Looking forward to learning from all of you.',
      time: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      user: 'Sarah M.',
      message: 'Welcome Amina! This is such a supportive community. Feel free to ask any questions.',
      time: '10:32 AM',
      isOwn: false
    },
    {
      id: 3,
      user: 'You',
      message: 'Welcome! We\'re here to support each other 💜',
      time: '10:35 AM',
      isOwn: true
    },
    {
      id: 4,
      user: 'Grace W.',
      message: 'Does anyone have tips for dealing with morning sickness?',
      time: '11:15 AM',
      isOwn: false
    },
    {
      id: 5,
      user: 'Mary J.',
      message: 'Ginger tea really helped me! Also eating small frequent meals.',
      time: '11:20 AM',
      isOwn: false
    }
  ],
  volunteer: [
    {
      id: 1,
      user: 'Nurse Janet',
      message: 'Hello! I\'m here to help with any health questions you might have.',
      time: '9:00 AM',
      isOwn: false
    },
    {
      id: 2,
      user: 'You',
      message: 'Hi! I have some questions about family planning options.',
      time: '9:05 AM',
      isOwn: true
    },
    {
      id: 3,
      user: 'Nurse Janet',
      message: 'I\'d be happy to help! What would you like to know about family planning?',
      time: '9:07 AM',
      isOwn: false
    },
    {
      id: 4,
      user: 'You',
      message: 'What are the most effective methods available?',
      time: '9:10 AM',
      isOwn: true
    },
    {
      id: 5,
      user: 'Nurse Janet',
      message: 'There are several effective options including IUDs, implants, pills, and condoms. Each has different benefits. Would you like me to explain each one?',
      time: '9:12 AM',
      isOwn: false
    }
  ]
};

const supportTopics = [
  { title: 'Pregnancy Support', icon: 'heart', color: '#E91E63' },
  { title: 'Menstrual Health', icon: 'calendar', color: '#9C27B0' },
  { title: 'Family Planning', icon: 'people', color: '#3F51B5' },
  { title: 'Mental Wellness', icon: 'happy', color: '#FF9800' },
  { title: 'Nutrition Tips', icon: 'nutrition', color: '#4CAF50' },
  { title: 'Exercise & Fitness', icon: 'fitness', color: '#795548' }
];

export default function CommunityScreen() {
  const [activeChat, setActiveChat] = useState('group'); // 'group' or 'volunteer'
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages[activeChat].length + 1,
        user: 'You',
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isOwn: true
      };
      
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...prev[activeChat], message]
      }));
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isOwn ? styles.ownMessage : styles.otherMessage
    ]}>
      {!item.isOwn && <Text style={styles.messageUser}>{item.user}</Text>}
      <Text style={[
        styles.messageText,
        item.isOwn ? styles.ownMessageText : styles.otherMessageText
      ]}>
        {item.message}
      </Text>
      <Text style={[
        styles.messageTime,
        item.isOwn ? styles.ownMessageTime : styles.otherMessageTime
      ]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Support</Text>
        <Text style={styles.headerSubtitle}>Connect with peers and get expert advice</Text>
      </View>

      <View style={styles.chatSelector}>
        <TouchableOpacity
          style={[styles.chatTab, activeChat === 'group' && styles.activeChatTab]}
          onPress={() => setActiveChat('group')}
        >
          <Ionicons 
            name="people" 
            size={20} 
            color={activeChat === 'group' ? '#fff' : theme.primary} 
          />
          <Text style={[
            styles.chatTabText,
            activeChat === 'group' && styles.activeChatTabText
          ]}>
            Group Chat
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.chatTab, activeChat === 'volunteer' && styles.activeChatTab]}
          onPress={() => setActiveChat('volunteer')}
        >
          <Ionicons 
            name="medical" 
            size={20} 
            color={activeChat === 'volunteer' ? '#fff' : theme.primary} 
          />
          <Text style={[
            styles.chatTabText,
            activeChat === 'volunteer' && styles.activeChatTabText
          ]}>
            Ask Expert
          </Text>
        </TouchableOpacity>
      </View>

      {activeChat === 'group' && (
        <View style={styles.supportTopics}>
          <Text style={styles.topicsTitle}>Support Topics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.topicsContainer}>
              {supportTopics.map((topic, index) => (
                <TouchableOpacity key={index} style={styles.topicCard}>
                  <Ionicons name={topic.icon} size={20} color={topic.color} />
                  <Text style={styles.topicText}>{topic.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <View style={styles.chatContainer}>
        <FlatList
          data={messages[activeChat]}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder={activeChat === 'group' ? 'Share with the community...' : 'Ask your question...'}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, newMessage.trim() && styles.sendButtonActive]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() ? '#fff' : theme.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {activeChat === 'group' && (
        <View style={styles.communityInfo}>
          <Ionicons name="information-circle" size={16} color={theme.primary} />
          <Text style={styles.communityInfoText}>
            This is a safe space for peer support. Please be respectful and kind.
          </Text>
        </View>
      )}

      {activeChat === 'volunteer' && (
        <View style={styles.communityInfo}>
          <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
          <Text style={styles.communityInfoText}>
            You're chatting with a verified health volunteer. Information is confidential.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    backgroundColor: theme.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 5,
  },
  chatSelector: {
    flexDirection: 'row',
    margin: 15,
    backgroundColor: theme.surface,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  activeChatTab: {
    backgroundColor: theme.primary,
  },
  chatTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.primary,
    marginLeft: 8,
  },
  activeChatTabText: {
    color: '#fff',
  },
  supportTopics: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  topicsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 10,
  },
  topicsContainer: {
    flexDirection: 'row',
  },
  topicCard: {
    backgroundColor: theme.surface,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topicText: {
    fontSize: 12,
    color: theme.text,
    textAlign: 'center',
    marginTop: 5,
  },
  chatContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageUser: {
    fontSize: 12,
    color: theme.textSecondary,
    marginBottom: 3,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    padding: 12,
    borderRadius: 18,
  },
  ownMessageText: {
    backgroundColor: theme.primary,
    color: '#fff',
    borderBottomRightRadius: 6,
  },
  otherMessageText: {
    backgroundColor: theme.surface,
    color: theme.text,
    borderBottomLeftRadius: 6,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 3,
  },
  ownMessageTime: {
    color: theme.textSecondary,
    textAlign: 'right',
  },
  otherMessageTime: {
    color: theme.textSecondary,
    textAlign: 'left',
  },
  inputContainer: {
    padding: 15,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.surface,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonActive: {
    backgroundColor: theme.primary,
  },
  communityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    marginTop: 0,
    padding: 10,
    backgroundColor: theme.surface,
    borderRadius: 8,
  },
  communityInfoText: {
    fontSize: 12,
    color: theme.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
});