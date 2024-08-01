import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUser, logoutUser } from '../../redux/actions/userActions';
import { useMessage } from '../../context/MessageContext';
import { capitalizeFirstLetter } from '../../services/stringUtil';

const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { showMessage } = useMessage(); 
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser() as any);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    showMessage('Logged out successfully!'); 
    navigation.replace('Login');
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${user.phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${user.email}`);
  };

  if (user.status === 'loading') {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.label}>Email:</Text>
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.infoEmail}>{user.email}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Phone:</Text>
        <TouchableOpacity onPress={handlePhonePress}>
          <Text style={styles.infoPhone}>{user.phone}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.info}>{user.username}</Text>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.info}>{capitalizeFirstLetter(user.gender)}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    marginVertical: 5,
  },
  info: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 15,
  },
  infoPhone: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 15,
  },
  infoEmail: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 15,
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

export default Profile;
