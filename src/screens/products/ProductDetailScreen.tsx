import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store';
import { fetchProduct } from '../../redux/actions/productActions';
import { addToCart, updateStock } from '../../redux/actions/cartActions';
import { ProdStackParamList } from '../../types';
import { CartAlert, ProdSkeletonLoader } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons'; 

type ProductDetailScreenRouteProp = RouteProp<ProdStackParamList, 'ProductDetail'>;

type ProductDetailScreenProps = {
  route: ProductDetailScreenRouteProp;
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { singleProduct, status, error } = useSelector((state: RootState) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handleAddToCart = () => {
    if (singleProduct) {
      setAlertVisible(true);
      dispatch(addToCart({ product: singleProduct, quantity }));
      dispatch(updateStock({ productId: singleProduct.id, quantity }));
    }
  };

  if (status === 'loading') {
    return <ProdSkeletonLoader />;
  }

  if (status === 'failed') {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!singleProduct) {
    return <Text style={styles.error}>Product not found</Text>;
  }

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: singleProduct.thumbnail }} style={styles.image} />
        <Text style={styles.title}>{singleProduct.title}</Text>
        <Text style={styles.description}>{singleProduct.description}</Text>
        <Text style={styles.category}>Category: <Text style={styles.categoryValue}>{singleProduct.category}</Text></Text>
        <Text style={styles.price}>Price: <Text style={styles.priceValue}>${singleProduct.price}</Text></Text>
        <Text style={styles.discount}>Discount: <Text style={styles.discountValue}>{singleProduct.discountPercentage}%</Text></Text>
        <Text style={styles.rating}>Rating: <Text style={styles.ratingValue}>{singleProduct.rating}</Text></Text>
        <Text style={styles.stock}>Stock: <Text style={styles.stockValue}>{singleProduct.stock}</Text></Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <Picker
            selectedValue={quantity}
            style={styles.picker}
            onValueChange={(itemValue) => setQuantity(itemValue)}
          >
            {[...Array(singleProduct.stock).keys()].map((_, index) => (
              <Picker.Item key={index} label={(index + 1).toString()} value={index + 1} />
            ))}
          </Picker>
        </View>

        <Button title="Add to Cart" onPress={handleAddToCart} />
      </ScrollView>
      {alertVisible && (
        <CartAlert
          visible={alertVisible}
          message="Item added to cart"
          onClose={handleCloseAlert}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60, // to make space for the back button
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  categoryValue: {
    color: '#555',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    marginBottom: 5,
    color: '#888',
  },
  priceValue: {
    color: '#27ae60',
    fontWeight: 'bold',
  },
  discount: {
    fontSize: 14,
    marginBottom: 5,
    color: '#888',
  },
  discountValue: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    marginBottom: 5,
    color: '#888',
  },
  ratingValue: {
    color: '#f39c12',
    fontWeight: 'bold',
  },
  stock: {
    fontSize: 14,
    marginBottom: 5,
    color: '#888',
  },
  stockValue: {
    color: '#555',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: 100,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ProductDetailScreen;
