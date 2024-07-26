import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchUser, logoutUser } from '../../redux/actions/userActions';

const Profile: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.id) {
      dispatch(fetchUser());
    }
  }, [dispatch, user.id]);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigation.replace('Login');
  };

  if (user.status === 'loading') {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.image }} style={styles.image} />
      <Text style={styles?.name}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles?.email}>{user.email}</Text>
      <Text style={styles?.username}>{user.username}</Text>
      <Text style={styles?.gender}>{user.gender}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 5,
  },
  gender: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 20,
  },
});

export default Profile;
