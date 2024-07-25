import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({onPress, title, ...props}) => (
  <TouchableOpacity style={styles.button} onPress={onPress} {...props}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderColor: '#db4437',
    borderWidth: 1,
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  socialButtonText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
});
export default Button;
