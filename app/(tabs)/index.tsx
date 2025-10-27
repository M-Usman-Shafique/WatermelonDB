import EnhancedProductsList from "@/components/ProductsList";
import { createProduct } from "@/watermelon/collections/products";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HomeScreen(): React.JSX.Element {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addProduct = async () => {
    if (!title || !price || !quantity) return;
    const newProduct = { title, price, quantity };
    await createProduct(newProduct);
    setTitle("");
    setPrice("");
    setQuantity("");
  };

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell]}>Title</Text>
        <Text style={[styles.cell, styles.headerCell]}>Price</Text>
        <Text style={[styles.cell, styles.headerCell]}>Qty.</Text>
        <Text style={[styles.cell, styles.headerCell]}>Edit</Text>
        <Text style={[styles.cell, styles.headerCell]}>Delete</Text>
      </View>

      {/* Table Body */}
      <EnhancedProductsList />

      {/* Input Row */}
      <View style={[styles.inputRow]}>
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Price"
          value={price.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setPrice(text)}
        />
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Quantity"
          value={quantity.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setQuantity(text)}
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={addProduct}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121212",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  headerRow: {
    backgroundColor: "#333",
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#fff",
  },
  inputRow: {
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    color: "#fff",
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
