import { currentUserAtom } from "@/atoms/auth.atom";
import { logout } from "@/watermelon/collections/users.collection";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Navbar(): React.JSX.Element {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const handleLogout = async () => {
    try {
      if (currentUser && currentUser.id) {
        await logout(currentUser.id);
        setCurrentUser(null);
        router.replace("/login");
      }
    } catch (error) {
      Alert.alert("Logout Failed", "An error occurred during logout");
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.username}>{currentUser?.username || "User"}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  username: {
    color: "#03DAC6",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButtonText: {
    color: "#FF3B30",
  },
});
