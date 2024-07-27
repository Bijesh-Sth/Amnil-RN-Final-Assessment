// SkeletonLoader.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoader: React.FC = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.image} />
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholder} />
        <View style={styles.textPlaceholder} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  textPlaceholder: {
    width: '100%',
    height: 20,
    borderRadius: 4,
    marginVertical: 5,
  },
});

export default SkeletonLoader;
