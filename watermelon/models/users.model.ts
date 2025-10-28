// users.ts
import { Model, Query } from "@nozbe/watermelondb";
import { field, text, date, children } from "@nozbe/watermelondb/decorators";
import Post from "./posts.model";
import Comment from "./comments.model";

export default class User extends Model {
  static table = "users";
  static associations = {
    posts: { type: "has_many", foreignKey: "user_id" },
    comments: { type: "has_many", foreignKey: "user_id" },
  } as const;

  @text("username") username!: string;
  @text("email") email!: string;
  @text("password") password!: string;
  @field("avatar") avatar?: string;
  @field("is_authenticated") isAuthenticated!: boolean;
  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;

  @children("posts") posts!: Query<Post>;
  @children("comments") comments!: Query<Comment>;
}
