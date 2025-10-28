// comments.ts
import { Model } from "@nozbe/watermelondb";
import { field, text, date, immutableRelation } from "@nozbe/watermelondb/decorators";
import User from "./users";
import Post from "./posts";

export default class Comment extends Model {
  static table = "comments";
  static associations = {
    users: { type: "belongs_to", key: "user_id" },
    posts: { type: "belongs_to", key: "post_id" },
  } as const;

  @text("body") body!: string;
  @field("user_id") userId!: string;
  @field("post_id") postId!: string;
  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;

  @immutableRelation('users', 'user_id') user!: User;
  @immutableRelation('posts', 'post_id') post!: Post;
}
