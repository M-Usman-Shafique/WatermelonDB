import {
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "@/watermelon/collections/products";
import Product from "@/watermelon/models/products";
import { FlatList, StyleSheet, Text } from "react-native";
import { withObservables } from "@nozbe/watermelondb/react";
import EnhancedProductItem from "./ProductItem";
import { useState } from "react";

function ProductsList({ products }: { products: Product[] }) {
  const [editable, setEditable] = useState<string | null>(null);

  const onSave = async (id: string, draft: IProduct) => {
    await updateProduct({
      id: id,
      title: draft.title,
      price: draft.price,
      quantity: draft.quantity,
    });
    setEditable(null);
  };

  const onEdit = (id: string) => {
    setEditable(id);
  };

  const onDelete = async (id: string) => {
    await deleteProduct(id);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      renderItem={({ item }) => (
        <EnhancedProductItem
          product={item}
          editable={editable}
          onSave={onSave}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>No products</Text>}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 10,
  },
});

const enhance = withObservables(["products"], () => ({
  products: getAllProducts(),
}));

const EnhancedProductsList = enhance(ProductsList);
export default EnhancedProductsList;
