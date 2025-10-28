// tags.ts
import { Model, Q } from "@nozbe/watermelondb";
import { text, date, lazy } from "@nozbe/watermelondb/decorators";

export default class Tag extends Model {
  static table = "tags";

  static associations = {
    post_tags: { type: "has_many", foreignKey: "tag_id" },
  } as const;

  @text("title") title!: string;
  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;

  @lazy
  posts = this.collections
    .get("posts")
    .query(Q.on("post_tags", "tag_id", this.id));
}
