import { FlatList, StyleSheet, Text, View } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import { useState } from "react";
import {
  deletePost,
  getAllPosts,
  updatePost,
} from "@/watermelon/collections/posts.collection";
import Post from "@/watermelon/models/posts.model";
import EnhancedPostCard from "./PostCard";

function PostsList({ posts }: { posts: Post[] }) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const onToggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const onEdit = (id: string | null) => {
    setEditingPostId(id);
    setOpenMenuId(null);
  };

  const onCancel = () => {
    setEditingPostId(null);
  };

  const onSave = async (id: string, post: IPost) => {
    await updatePost({
      id,
      title: post.title,
      body: post.body,
      isStarred: post.isStarred,
    });
    setEditingPostId(null);
  };

  const onDelete = async (id: string) => {
    await deletePost(id);
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={({ item }) => (
        <EnhancedPostCard
          post={item}
          isMenuOpen={openMenuId === item.id}
          isEditing={editingPostId === item.id}
          onToggleMenu={() => onToggleMenu(item.id)}
          onEdit={() => onEdit(item.id)}
          onCancel={onCancel}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Text style={styles.emptyText}>No posts</Text>}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 10,
  },
});

const enhance = withObservables(["posts"], () => ({
  posts: getAllPosts(),
}));

const EnhancedPostsList = enhance(PostsList);
export default EnhancedPostsList;
