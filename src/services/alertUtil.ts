import { Alert } from 'react-native';

export const showAlert = (title: string, message: string, duration: number = 1000) => {
  Alert.alert(title, message);
  setTimeout(() => {
    Alert.alert('');
  }, duration);
};