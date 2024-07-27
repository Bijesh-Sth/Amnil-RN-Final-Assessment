import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { searchProducts } from '../../redux/actions/searchAction';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProdStackParamList } from '../../types';

type SearchScreenNavigationProp = StackNavigationProp<ProdStackParamList, 'Search'>;

const SearchScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const { products, status, error } = useSelector((state: RootState) => state.search);

  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchProducts(query));
    }
  };

  const handleNavigateToDetail = (productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for products..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {products.length === 0 && status === 'idle' && <Text>No products available</Text>}
      {status === 'succeeded' && products.length === 0 && <Text>No products found</Text>}

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productContainer} onPress={() => handleNavigateToDetail(item.id)}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginVertical: 20,
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default SearchScreen;
