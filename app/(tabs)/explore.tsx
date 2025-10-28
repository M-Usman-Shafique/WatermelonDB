import { StyleSheet, Text, View } from 'react-native';

export default function Explore(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#121212",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#03DAC6",
  },
});
