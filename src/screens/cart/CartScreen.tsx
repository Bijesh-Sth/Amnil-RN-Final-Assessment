import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addToCart, updateStock, removeFromCart, updateCartQuantity, clearCart } from '../../redux/actions/cartActions';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigation = useNavigation();

  const handleIncreaseQuantity = (product: any) => {
    if (product.stock > 0) {
      dispatch(updateCartQuantity({ productId: product.id, quantity: 1 }));
      dispatch(updateStock({ productId: product.id, quantity: 1 }));
    }
  };

  const handleDecreaseQuantity = (product: any) => {
    const item = cartItems.find(item => item.product.id === product.id);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ productId: product.id, quantity: -1 }));
      dispatch(updateStock({ productId: product.id, quantity: -1 }));
    } else {
      dispatch(removeFromCart({ productId: product.id }));
    }
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const renderCartItem = ({ item }: { item: any }) => {
    const { product } = item;
    const imageUrl = product.thumbnail || 'https://via.placeholder.com/80';
    const productName = product.title || 'No Name';

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}>
        <View style={styles.cartItem}>
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productStock}>Stock: {product.stock}</Text>
            <View style={styles.buttonContainer}>
              <Button title="+" onPress={() => handleIncreaseQuantity(product)} />
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <Button title="-" onPress={() => handleDecreaseQuantity(product)} />
              <TouchableOpacity onPress={() => handleRemoveItem(product.id)} style={styles.removeButton}>
                <Icon name="trash-can" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon name="cart-off" size={60} color="#888" />
          <Text style={styles.emptyText}>No items in cart</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id.toString()}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ${}</Text>
            <Button title="Clear Cart" onPress={handleClearCart} />
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productStock: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  removeButton: {
    marginLeft: 'auto',
    padding: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 16,
  },
});
