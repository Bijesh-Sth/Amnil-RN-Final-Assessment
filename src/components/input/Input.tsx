import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = props => (
  <TextInput style={styles.input} {...props} />
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default Input;
