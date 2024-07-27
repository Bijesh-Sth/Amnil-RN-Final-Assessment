import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoader: React.FC = () => (
  <SkeletonPlaceholder
    backgroundColor="#E1E9EE"
    highlightColor="#F2F8FC"
  >
    <View style={styles.skeletonProductContainer}>
      <View style={styles.skeletonProductImage} />
      <View style={styles.skeletonProductName} />
      <View style={styles.skeletonButton} />
    </View>
  </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  skeletonProductContainer: {
    alignItems: 'center',
    margin: 10,
    width: 100,
  },
  skeletonProductImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  skeletonProductName: {
    marginTop: 5,
    width: 60,
    height: 20,
    borderRadius: 4,
  },
  skeletonButton: {
    marginTop: 10,
    width: 60,
    height: 30,
    borderRadius: 4,
  },
});

export default SkeletonLoader;
