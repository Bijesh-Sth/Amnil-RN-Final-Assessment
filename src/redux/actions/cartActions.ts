import { createAction } from '@reduxjs/toolkit';
import { CartItem } from '../reducers/cartReducer';

export const addToCart = createAction<CartItem>('cart/addToCart');
export const updateStock = createAction<{ productId: number, quantity: number }>('cart/updateStock');
