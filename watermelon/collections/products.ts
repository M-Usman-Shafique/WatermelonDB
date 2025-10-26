import database from "../database";
import Product from "../models/products";

const products = database.collections.get<Product>("products");

const getAllProducts = async (): Promise<Product[]> => {
  return await products.query().fetch();
};

const getProductById = async (id: string): Promise<Product | undefined> => {
  return await products.find(id);
};

const createProduct = async (product: IProduct): Promise<void> => {
  await database.write(async () => {
    await products.create((record) => {
      record.title = product.title;
      record.price = parseFloat(product.price);
      record.quantity = Number(product.quantity);
    });
  });
};

const updateProduct = async (product: IProduct): Promise<void> => {
  await database.write(async () => {
    const record = await getProductById(product.id ?? '');

    if (!record) {
      throw new Error("Product not found");
    }

    await record.update((r) => {
      r.title = product.title;
      r.price = parseFloat(product.price);
      r.quantity = Number(product.quantity);
      r.updatedAt = new Date();
    });
  });
};

const deleteProduct = async (id: string): Promise<void> => {
  await database.write(async () => {
    const record = await getProductById(id);

    if (!record) {
      throw new Error("Product not found");
    }

    await record.destroyPermanently();
  });
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
