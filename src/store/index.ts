import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

const reducer = {
  products: productsReducer,
  cart: cartReducer,
};

export const createAppStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
  });

export const store = createAppStore();

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
