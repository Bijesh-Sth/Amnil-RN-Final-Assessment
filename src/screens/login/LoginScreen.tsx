import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { loginUser } from '../../redux/actions/userActions';
import { Button, Input } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginAttempted, setLoginAttempted] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleLogin = async () => {
    if (username && password) {
      setLoginAttempted(true);
      await dispatch(loginUser({ username, password }));
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  useEffect(() => {
    if (loginAttempted) {
      if (status === 'succeeded') {
        navigation.replace('Home');
      } else if (status === 'failed') {
        Alert.alert('Error', 'Failed to login');
      }
    }
  }, [status, loginAttempted]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SO.</Text>
      <Text style={styles.orText}>Sign in with your credentials</Text>
      <View style={styles.inputContainer}>
        <Input 
          placeholder="Username" 
          value={username} 
          onChangeText={setUsername} 
          placeholderTextColor="#888888"
          style={styles.input}
        />
      </View>
      <View style={[styles.inputContainer, styles.passwordInputContainer]}>
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#888888"
          style={{ ...styles.input }}
        />
        <TouchableOpacity style={styles.toggleButton} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      <Button title="Sign In" onPress={handleLogin} />

      {status === 'loading' && (
        <View style={StyleSheet.absoluteFill}>
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        </View>
      )}

      {error && typeof error === 'string' && <Text style={styles.errorText}>{error}</Text>}

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
    color: '#3498db',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#333333',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 10,
    width: '100%',
  },
  passwordInputContainer: {
    paddingLeft: 10,
  },
  toggleButton: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    color: '#333333', 
    flex: 1,
  },
});

export default Login;
