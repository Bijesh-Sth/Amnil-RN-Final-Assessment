import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { Priority } from '../../types';

interface PriorityPickerProps {
  selectedPriority: Priority;
  onPriorityChange: (priority: Priority) => void;
}

const priorities: Record<Priority, string> = {
  Low: '#7CFC00',
  Medium: '#FFA500',
  High: '#FF4500',
};

const PriorityPicker: React.FC<PriorityPickerProps> = ({ selectedPriority, onPriorityChange }) => {
  return (
    <Picker
      selectedValue={selectedPriority}
      style={styles.picker}
      onValueChange={(itemValue: Priority) => onPriorityChange(itemValue)}
    >
      {Object.keys(priorities).map(key => (
        <Picker.Item key={key} label={key} value={key} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default PriorityPicker;
