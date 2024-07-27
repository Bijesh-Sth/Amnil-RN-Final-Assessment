import React from 'react';
import { Image, StyleSheet } from 'react-native';
import bannerImage from '../../assets/image/banner.png';

const BannerComponent: React.FC = () => (
  <Image source={bannerImage} style={styles.bannerImage} />
);

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 200,
  },
});

export default BannerComponent;
