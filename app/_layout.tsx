import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { getCurrentUser } from "@/watermelon/collections/users.collection";
import Navbar from "@/components/Navbar";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useAtom } from "jotai";
import {
  currentUserAtom,
  isAuthenticatedAtom,
  isLoadingAtom,
} from "@/atoms/auth.atom";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout(): React.JSX.Element {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const segments = useSegments();
  const router = useRouter();
  const inTabsGroup = segments[0] === "(tabs)";

  useEffect(() => {
    let isActive = true;
    const checkAuth = async () => {
      setIsAuthenticated(false);
      try {
        const user = await getCurrentUser();
        if (!isActive) return;
        setCurrentUser(user || null);
      } catch (error) {
        console.error("Error checking auth:", error);
        if (!isActive) return;
        setCurrentUser(null);
      } finally {
        if (!isActive) return;
        setIsLoading(false);
        setIsAuthenticated(true);
      }
    };

    checkAuth();
    return () => {
      isActive = false;
    };
  }, [segments, setCurrentUser, setIsAuthenticated, setIsLoading]);

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    if (!currentUser?.isAuthenticated && inTabsGroup) {
      router.replace("/login");
    } else if (currentUser?.isAuthenticated && !inTabsGroup) {
      router.replace("/(tabs)");
    }
  }, [currentUser, segments, router, inTabsGroup, isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03DAC6" />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {currentUser?.isAuthenticated && inTabsGroup && <Navbar />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});
