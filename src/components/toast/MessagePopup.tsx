import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessagePopupProps {
  message: string;
}

const MessagePopup: React.FC<MessagePopupProps> = ({ message }) => {
  return (
    <View style={styles.popupContainer}>
      <View style={styles.popup}>
        <Text style={styles.popupText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  popupText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MessagePopup;
