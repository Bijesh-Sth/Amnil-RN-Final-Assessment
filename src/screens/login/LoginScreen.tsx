import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Input } from '../../components'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.token);
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SO.</Text>
      <Text style={styles.orText}>Sign in with your credentials</Text>

      <Input placeholder="Username" value={username} onChangeText={setUsername} />

      <View style={styles.passwordInputContainer}>
        <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={{ flex: 1 }} />
        <TouchableOpacity style={styles.toggleButton} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      <Button title="Sign In" onPress={handleLogin} />

      {loading && (
        <View style={StyleSheet.absoluteFill}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
      )}

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.signupText} onPress={() => navigation.replace('Signup')}>
          Create an account
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#6c757d',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6c757d',
  },
  signupText: {
    color: '#3498db',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 10,
  },
  toggleButton: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
});

export default Login;
