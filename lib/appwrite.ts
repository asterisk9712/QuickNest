import { Client, Account, Avatars } from "react-native-appwrite";
import * as Linking from "expo-linking";

export const config = {
  platform : 'com.jsm.quicknest',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
};

export const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

// ✅ OAuth Google Login
export async function login() {
  try {
    const redirectUri = Linking.createURL("/auth/callback"); // Ensure valid redirect URI

    console.log("Redirect URI:", redirectUri); // Debugging: Check if redirect URI is valid

    // ✅ Open Appwrite OAuth2 Session with Google
    await account.createOAuth2Session("google", redirectUri);

    // ✅ Fetch the current session
    const session = await account.getSession("current");

    console.log("Session:", session); // Debugging: Check if session is created

    if (!session) {
      throw new Error("Failed to create a session");
    }

    return session;
  } catch (error) {
    console.error("Login Error:", error);
    return false;
  }
}

// ✅ Logout Function
export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
}

// ✅ Get Current User
export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return {
        response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error("Get User Error:", error);
    return null;
  }
}
