// posts.ts
import { Model, Q, Query } from "@nozbe/watermelondb";
import { field, text, date, immutableRelation, children, lazy } from "@nozbe/watermelondb/decorators";
import Comment from "./comments";
import User from "./users";

export default class Post extends Model {
  static table = "posts";
  static associations = {
    users: { type: "belongs_to", key: "user_id" },
    comments: { type: "has_many", foreignKey: "post_id" },
    post_tags: { type: 'has_many', foreignKey: 'post_id' },
  } as const;

  @text("title") title!: string;
  @text("body") body!: string;
  @field("is_starred") isStarred!: boolean;
  @field("user_id") userId!: string;
  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;

  @immutableRelation('users', 'user_id') user!: User;
  @children("comments") comments!: Query<Comment>;

  @lazy
  tags = this.collections
    .get('tags')
    .query(Q.on('post_tags', 'post_id', this.id))
}
