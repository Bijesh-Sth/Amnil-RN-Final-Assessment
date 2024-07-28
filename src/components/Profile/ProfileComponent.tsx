import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUser, logoutUser } from '../../redux/actions/userActions';

const ProfileComponent: React.FC = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { status } = useSelector((state: RootState) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);

      if (token) {
        dispatch(fetchUser() as any);
      }
    };

    checkToken();
  }, [dispatch]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken'); // Also remove the refresh token
    dispatch(logoutUser() as any);
    setIsAuthenticated(false);
    Alert.alert('Logged out successfully!');
    props.navigation.replace('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity 
        style={styles.profileContainer} 
        onPress={() => props.navigation.navigate('Tab', { screen: 'Account' })}
      >
        {status === 'loading' ? (
          <ActivityIndicator size="large" color="#FFA500" />
        ) : (
          isAuthenticated ? (
            <>
              <Image 
                source={{ uri: user?.image }} 
                style={styles.profileImage} 
              />
              <Text style={styles.profileName}>{`${user?.firstName} ${user?.lastName}`}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : null
        )}
      </TouchableOpacity>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
  },
  profileEmail: {
    fontSize: 14,
    color: '#333', 
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#db4437',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileComponent;
