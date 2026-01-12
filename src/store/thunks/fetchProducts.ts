import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../api/products';
import type { Product } from '../../types/Product';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const products = await getProducts();
  return products as Product[];
});
