import { withObservables } from "@nozbe/watermelondb/react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import Post from "@/watermelon/models/posts.model";
import { getPostsAuthor } from "@/watermelon/collections/posts.collection";
import User from "@/watermelon/models/users.model";
import { DropdownMenu } from "./DropdownMenu";

interface PostCardProps {
  post: Post;
  isMenuOpen: boolean;
  isEditing: boolean;
  onToggleMenu: (id: string) => void;
  onEdit: (id: string | null) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  onSave: (id: string, draft: IPost) => void;
}

export const PostCard = ({
  post,
  isMenuOpen,
  isEditing,
  onToggleMenu,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: PostCardProps): React.JSX.Element => {
  const [editTitle, setEditTitle] = useState(post.title);
  const [editBody, setEditBody] = useState(post.body);
  const [author, setAuthor] = useState<User | null>(null);
  const titleInputRef = useRef<TextInput>(null);

  useEffect(() => {
    (async () => {
      const author = await getPostsAuthor(post);
      setAuthor(author);
    })();
  }, [post]);

  useEffect(() => {
    if (isEditing) {
      setEditTitle(post.title);
      setEditBody(post.body);
      titleInputRef.current?.focus();
    }
  }, [isEditing, post.title, post.body]);

  const onSavePost = () => {
    onSave(post.id, {
      title: editTitle,
      body: editBody,
      isStarred: post.isStarred,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{author?.username.charAt(0)}</Text>
          </View>
          <View style={styles.nameAndDate}>
            <Text style={styles.username}>{author?.username}</Text>
            <Text style={styles.date}>
              {post.createdAt.toLocaleDateString()}
            </Text>
          </View>
        </View>

        <DropdownMenu
          isOpen={isMenuOpen}
          onToggle={() => onToggleMenu(post.id)}
          options={[
            { label: "Edit", onPress: () => onEdit(post.id) },
            { label: "Delete", onPress: () => onDelete(post.id) },
          ]}
        />
      </View>

      <TextInput
        ref={titleInputRef}
        style={[styles.title, isEditing && [styles.inputEdit, styles.titleEdit]]}
        value={isEditing ? editTitle : post.title}
        onChangeText={setEditTitle}
        editable={isEditing}
        placeholder="Enter post's title"
        placeholderTextColor="#777"
      />

      <TextInput
        style={[styles.body, isEditing && styles.inputEdit]}
        value={isEditing ? editBody : post.body}
        onChangeText={setEditBody}
        editable={isEditing}
        placeholder="Enter post's description"
        placeholderTextColor="#777"
        multiline
      />

      {isEditing && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.saveButton]}
            onPress={onSavePost}
          >
            <Text style={[styles.buttonText, styles.saveText]}>Save</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#03DAC6",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  nameAndDate: {
    flexDirection: "column",
    justifyContent: "center",
  },
  username: {
    color: "#999",
    fontWeight: "600",
    fontSize: 14,
  },
  date: {
    color: "#888",
    fontSize: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  body: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 20,
  },
  inputEdit: {
    borderWidth: 1,
    borderColor: "#03DAC6",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  titleEdit: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#333",
  },
  saveButton: {
    backgroundColor: "#03DAC6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  saveText: {
    color: "#000",
  },
});

const enhance = withObservables(["post"], ({ post }: { post: Post }) => ({
  post,
}));

const EnhancedPostCard = enhance(PostCard);
export default EnhancedPostCard;
