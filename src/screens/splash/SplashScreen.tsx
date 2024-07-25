import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000, 
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, 
          duration: 1000, 
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    setTimeout(() => {
      navigation.replace('Login');
    }, 5000);
  }, [navigation, scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/image/logo.png')}
        style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
