import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface SimulatorProps {
  dmPrompt: string;
  commentPrompt: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function Simulator({ dmPrompt, commentPrompt }: SimulatorProps) {
  const [activeTab, setActiveTab] = useState<'dm' | 'comment'>('dm');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am your AI agent. Test your prompt by sending a message below.' }
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: activeTab === 'dm' 
          ? `(Mock DM Response based on: ${dmPrompt.substring(0, 30)}...)` 
          : `(Mock Comment Response based on: ${commentPrompt.substring(0, 30)}...)`
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live OpenAI Simulator</Text>
        <Text style={styles.subtitle}>Test your {activeTab.toUpperCase()} Agent prompt right now before or after saving.</Text>
      </View>

      <View style={styles.tabsRow}>
        <Pressable 
          style={[styles.tab, activeTab === 'dm' && styles.tabActive]} 
          onPress={() => setActiveTab('dm')}
        >
          <Text style={[styles.tabText, activeTab === 'dm' && styles.tabTextActive]}>Test DM</Text>
        </Pressable>
        <Pressable 
          style={[styles.tab, activeTab === 'comment' && styles.tabActive]} 
          onPress={() => setActiveTab('comment')}
        >
          <Text style={[styles.tabText, activeTab === 'comment' && styles.tabTextActive]}>Test Comment</Text>
        </Pressable>
      </View>

      <View style={styles.chatContainer}>
        <ScrollView style={styles.messagesList} contentContainerStyle={{ padding: 16 }}>
          {messages.map(msg => (
            <View key={msg.id} style={[styles.bubbleWrap, msg.sender === 'user' ? styles.bubbleRight : styles.bubbleLeft]}>
              <View style={[styles.bubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
                <Text style={[styles.bubbleText, msg.sender === 'user' && styles.bubbleTextUser]}>{msg.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder={`Type a test ${activeTab.toUpperCase()}...`}
            placeholderTextColor={COLORS.gray}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <Pressable style={styles.sendBtn} onPress={handleSend}>
            <Feather name="send" size={16} color={COLORS.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
    overflow: 'hidden',
    marginTop: 24,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.orange,
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.orange,
  },
  chatContainer: {
    height: 350,
    backgroundColor: COLORS.background,
  },
  messagesList: {
    flex: 1,
  },
  bubbleWrap: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  bubbleLeft: {
    justifyContent: 'flex-start',
  },
  bubbleRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleAi: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: COLORS.orange,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    color: COLORS.white,
    fontSize: 14,
  },
  bubbleTextUser: {
    color: COLORS.white,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#222',
    backgroundColor: COLORS.card,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    color: COLORS.white,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
