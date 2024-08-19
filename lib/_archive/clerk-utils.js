import { clerkClient } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs";

export const getAllUsers = async () => {
  const users = await clerkClient.users?.getUserList();
  users?.map((user) => {});
  return users;
};

export const getUserById = async (userId) => {
  try {
    const user = await clerkClient.users?.getUser(userId);
    if (user) {
      // Assuming that the user has a "firstName" and "lastName" field
      return user;
    }
    return "Unknown User";
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return "Unknown User";
  }
};

export const getCurrentUser = async () => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (user) {
      return user;
    }
    return null; // No user is authenticated
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
