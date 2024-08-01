import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import { RootState } from '../../redux/store';
import { BannerComponent, CategoryListComponent, SkeletonLoader } from '../../components';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = Array.from(new Set(products.map((product: any) => capitalizeFirstLetter(product.category))));

  return (
    <FlatList
      ListHeaderComponent={<BannerComponent />}
      data={status === 'loading' ? new Array(5).fill(null) : categories}
      renderItem={({ item }) => 
        status === 'loading' ? (
          <View style={styles.skeletonContainer}>
            {new Array(5).fill(null).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </View>
        ) : (
          <CategoryListComponent category={item} products={products.filter((product: any) => capitalizeFirstLetter(product.category) === item)} />
        )
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
