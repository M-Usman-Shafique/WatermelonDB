// post-tags.ts
import { Model } from "@nozbe/watermelondb";
import { immutableRelation } from "@nozbe/watermelondb/decorators";
import Post from "./posts.model";
import Tag from "./tags.model";

// Pivot (joint) table model for many-to-many relation
export default class PostTag extends Model {
  static table = "post_tags";

  static associations = {
    posts: { type: "belongs_to", key: "post_id" },
    tags: { type: "belongs_to", key: "tag_id" },
  } as const;

  @immutableRelation("posts", "post_id") post!: Post;
  @immutableRelation("tags", "tag_id") tag!: Tag;
}
