import React from 'react';
import { Image, StyleSheet } from 'react-native';

const BannerComponent: React.FC = () => (
  <Image source={{
    uri: 'https://www.jadeglobal.com/sites/default/files/2022-09/Getting-Started-on-React-Native.jpg',
  }} style={styles.bannerImage} />
);

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 200,
  },
});

export default BannerComponent;
