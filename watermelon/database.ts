import { Platform } from "react-native";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import migrations from "./migrations";
import User from "./models/users.model";
import Post from "./models/posts.model";
import Comment from "./models/comments.model";
import Tag from "./models/tags.model";
import PostTag from "./models/post-tags.model";

const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  dbName: "watermelon-db",
  jsi: Platform.OS === "ios",
  onSetUpError: (error) => {
    console.error(error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [User, Post, Comment, Tag, PostTag],
});
export default database;
