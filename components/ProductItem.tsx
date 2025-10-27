import Product from "@/watermelon/models/products";
import { withObservables } from "@nozbe/watermelondb/react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";

interface ProductItemProps {
  product: Product;
  editable: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (id: string, draft: IProduct) => void;
}

export const ProductItem = ({
  product,
  editable,
  onEdit,
  onSave,
  onDelete,
}: ProductItemProps): React.JSX.Element => {
  const [editTitle, setEditTitle] = useState(product.title);
  const [editPrice, setEditPrice] = useState(product.price.toString());
  const [editQuantity, setEditQuantity] = useState(product.quantity.toString());
  const isEditing = editable === product.id;

  useEffect(() => {
    if (isEditing) {
      setEditTitle(product.title);
      setEditPrice(product.price.toString());
      setEditQuantity(product.quantity.toString());
    }
  }, [isEditing, product.title, product.price, product.quantity]);

  const handleSave = () => {
    onSave(product.id, {
      title: editTitle,
      price: editPrice || "",
      quantity: editQuantity || "",
    });
  };

  return (
    <>
      <View style={styles.row}>
        <TextInput
          style={styles.cell}
          value={isEditing ? editTitle : product.title}
          onChangeText={setEditTitle}
          editable={isEditing}
        />
        <TextInput
          style={styles.cell}
          value={isEditing ? editPrice : product.price.toString()}
          onChangeText={setEditPrice}
          editable={isEditing}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.cell}
          value={isEditing ? editQuantity : product.quantity.toString()}
          onChangeText={setEditQuantity}
          editable={isEditing}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.cell}
          onPress={isEditing ? handleSave : () => onEdit(product.id)}
        >
          <Text style={styles.cellText}>{isEditing ? "💾" : "✏️"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell}
          onPress={() => onDelete(product.id)}
        >
          <Text style={styles.cellText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#555",
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    color: "#fff",
  },
  cellText: {
    textAlign: "center",
  },
});

const enhance = withObservables(
  ["product"],
  ({ product }: { product: Product }) => ({
    product,
  })
);

const EnhancedProductItem = enhance(ProductItem);
export default EnhancedProductItem;