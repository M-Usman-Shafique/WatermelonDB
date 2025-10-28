import { currentUserAtom } from "@/atoms/auth.atom";
import EnhancedPostsList from "@/components/PostsList";
import { createPost } from "@/watermelon/collections/posts.collection";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HomeScreen(): React.JSX.Element {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addPost = async () => {
    if (!title || !body) return;
    const newPost: IPost = {
      title,
      body,
      isStarred: false,
      userId: currentUser?.id || "",
    };

    await createPost(newPost);
    setTitle("");
    setBody("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Enter post's title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter post's description"
          placeholderTextColor="#888"
          value={body}
          onChangeText={setBody}
          style={[styles.input, { height: 100 }]}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={addPost}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>

      <View style={styles.postsList}>
        <EnhancedPostsList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121212",
    flex: 1,
  },
  form: {
    width: "100%",
    gap: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 44,
  },
  button: {
    backgroundColor: "#03DAC6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  postsList: {
    flex: 1,
    marginTop: 16,
  },
});
