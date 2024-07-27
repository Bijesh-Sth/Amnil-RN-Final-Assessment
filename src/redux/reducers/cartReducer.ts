import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCart, updateStock } from '../actions/cartActions';

export interface CartItem {
  product: any;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart, (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    });
    builder.addCase(updateStock, (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
      const product = state.items.find(item => item.product.id === action.payload.productId);
      if (product) {
        product.product.stock -= action.payload.quantity;
      }
    });
  },
});

export default cartSlice.reducer;
