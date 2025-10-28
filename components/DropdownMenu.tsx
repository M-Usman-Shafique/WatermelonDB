import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface DropdownMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  options: { label: string; onPress: () => void }[];
  iconColor?: string;
  iconSize?: number;
}

export const DropdownMenu = ({
  isOpen = false,
  onToggle,
  options = [],
  iconColor = "#888",
  iconSize = 24,
}: DropdownMenuProps): React.JSX.Element => {
  return (
    <View style={{ position: "relative" }}>
      <Pressable onPress={onToggle}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={iconSize}
          color={iconColor}
        />
      </Pressable>

      {isOpen && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={onToggle} />

          <View style={styles.menuContainer}>
            {options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuItem}
                onPress={() => {
                  onToggle();
                  opt.onPress();
                }}
              >
                <Text style={styles.menuText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 20,
    right: 0,
    backgroundColor: "#2a2a2a",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
    paddingVertical: 4,
    minWidth: 120,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    color: "#fff",
    fontSize: 14,
  },
});
