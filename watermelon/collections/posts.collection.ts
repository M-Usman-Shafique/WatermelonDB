import { Query } from "@nozbe/watermelondb";
import database from "../database";
import Post from "../models/posts.model";
import User from "../models/users.model";

const posts = database.collections.get<Post>("posts");

const getAllPosts = (): Query<Post> => {
  return posts.query();
};

const getPostById = async (
  id: string | undefined
): Promise<Post | undefined> => {
  if (!id) {
    throw new Error("Post ID is required");
  }
  return await posts.find(id);
};

const getPostsAuthor = async (post: Post): Promise<User | null> => {
  return await post.user.fetch();
};

const createPost = async (post: IPost): Promise<void> => {
  await database.write(async () => {
    await posts.create((record) => {
      record.title = post.title;
      record.body = post.body;
      record.isStarred = post.isStarred;
      record.userId = post.userId || "";
      record.createdAt = new Date();
    });
  });
};

const updatePost = async (post: IPost): Promise<void> => {
  await database.write(async () => {
    const record = await getPostById(post.id);

    if (!record) {
      throw new Error("Post not found");
    }

    await record.update((r) => {
      r.title = post.title;
      r.body = post.body;
      r.isStarred = post.isStarred;
      r.updatedAt = new Date();
    });
  });
};

const deletePost = async (id: string): Promise<void> => {
  await database.write(async () => {
    const record = await getPostById(id);

    if (!record) {
      throw new Error("Post not found");
    }

    await record.destroyPermanently();
  });
};

export {
  getAllPosts,
  getPostById,
  getPostsAuthor,
  createPost,
  updatePost,
  deletePost,
};
