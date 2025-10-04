// src/screens/ChatScreen.tsx
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, List, TextInput } from "react-native-paper";
import { RootStackParamList } from "../navigation/AppNavigator";

type ChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Chat"
>;

type Props = {
  navigation: ChatScreenNavigationProp;
};

interface Message {
  id: string;
  text: string;
}

const ChatScreen: React.FC<Props> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = { id: Date.now().toString(), text: input };
    setMessages((prev) => [newMessage, ...prev]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item title={item.text} style={styles.messageItem} />
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />
          <Button mode="contained" onPress={sendMessage}>
            Send
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#e3e3e3",
    borderRadius: 8,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});

export default ChatScreen;
