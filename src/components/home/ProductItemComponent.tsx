import React from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { addToCart } from '../../redux/actions/cartActions';
import { ProdStackParamList } from '../../types';

type ProductItemComponentProps = {
  item: any;
};

type ProductDetailScreenNavigationProp = StackNavigationProp<
  ProdStackParamList,
  'ProductDetail'
>;

const ProductItemComponent: React.FC<ProductItemComponentProps> = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleNavigateToDetail = () => {
    navigation.navigate('ProductDetail', { productId: item.id });
  };

  return (
    <TouchableOpacity style={styles.productContainer} onPress={handleNavigateToDetail}>
      <Image
        source={item.thumbnail && item.thumbnail !== "..." ? { uri: item.thumbnail } : require('../../assets/image/logo.png')}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productName: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default ProductItemComponent;
