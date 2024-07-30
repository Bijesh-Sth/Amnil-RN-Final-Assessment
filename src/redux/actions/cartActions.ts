import { createAction } from '@reduxjs/toolkit';
import { CartItem } from '../reducers/cartReducer';

export const addToCart = createAction<CartItem>('cart/addToCart');
export const updateStock = createAction<{ productId: number, quantity: number }>('cart/updateStock');
export const removeFromCart = createAction<{ productId: number }>('cart/removeFromCart');
export const updateCartQuantity = createAction<{ productId: number, quantity: number }>('cart/updateCartQuantity');
export const clearCart = createAction('cart/clearCart');
