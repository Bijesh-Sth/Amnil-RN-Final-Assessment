import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ProductItemComponent } from '../';

const CategoryListComponent: React.FC<{ category: string; products: any[] }> = ({ category, products }) => (
  <View>
    <Text style={styles.categoryTitle}>{category}</Text>
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItemComponent item={item} />}
      keyExtractor={(product) => product.id.toString()}
      horizontal
    />
  </View>
);

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: '#333333',
  },
});

export default CategoryListComponent;
