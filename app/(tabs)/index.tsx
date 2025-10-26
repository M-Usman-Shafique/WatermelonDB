import { createProduct, getAllProducts } from '@/watermelon/collections/products';
import Product from '@/watermelon/models/products';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!title || !price || !quantity) return;
    const newProduct = { title, price, quantity };
    await createProduct(newProduct);
    setTitle('');
    setPrice('');
    setQuantity('');
    // setProducts([...products, newProduct]);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>{item.price}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell]}>Title</Text>
        <Text style={[styles.cell, styles.headerCell]}>Price</Text>
        <Text style={[styles.cell, styles.headerCell]}>Quantity</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products</Text>
        }
      />

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
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        <TextInput
          style={[styles.cell, styles.input]}
          placeholder="Quantity"
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={addProduct}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerRow: {
    backgroundColor: '#f2f2f2',
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 10,
  },
});

