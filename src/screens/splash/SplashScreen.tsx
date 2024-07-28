import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { refreshToken } from '../../redux/actions/userActions';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
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

    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
      if (token && refreshTokenValue) {
        try {
          await dispatch(refreshToken()).unwrap();
          navigation.replace('Home');
        } catch (error) {
          navigation.replace('Login');
        }
      } else {
        setTimeout(() => {
          navigation.replace(token ? 'Home' : 'Login');
        }, 3000);
      }
    };

    checkToken();
  }, [dispatch, navigation, scaleValue]);

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
