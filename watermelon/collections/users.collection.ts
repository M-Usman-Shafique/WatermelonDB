import { Q } from "@nozbe/watermelondb";
import database from "../database";
import User from "../models/users.model";

const users = database.collections.get<User>("users");

const getUserById = async (id: string): Promise<User | undefined> => {
  return await users.find(id);
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const foundUsers = await users.query(Q.where("email", email)).fetch();

  if (foundUsers.length > 0) {
    return foundUsers[0];
  }

  return null;
};

const signup = async (user: IUser): Promise<void> => {
  await database.write(async () => {
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
      throw new Error("User already exists. Please use a different email.");
    }

    await users.create((record) => {
      record.username = user.username;
      record.email = user.email;
      record.password = user.password;
      record.isAuthenticated = false;
    });
  });
};

const login = async (email: string, password: string): Promise<void> => {
  await database.write(async () => {
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password. Please try again.");
    }
    await user.update((record) => {
      record.isAuthenticated = true;
    });
  });
};

const logout = async (id: string): Promise<void> => {
  await database.write(async () => {
    const user = await getUserById(id);
    if (!user) {
      throw new Error("User not found. Please check your email and password.");
    }
    await user.update((record) => {
      record.isAuthenticated = false;
    });
  });
};

const getCurrentUser = async (): Promise<User | null> => {
  const allUsers = await users.query(Q.where("is_authenticated", true)).fetch();
  return allUsers[0] || null;
};

export { signup, login, logout, getUserByEmail, getCurrentUser };
