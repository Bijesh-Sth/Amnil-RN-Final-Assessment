import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

interface CategoryPickerProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['Work', 'Personal', 'Shopping'];

const CategoryPicker: React.FC<CategoryPickerProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <Picker
      selectedValue={selectedCategory}
      style={styles.picker}
      onValueChange={(itemValue) => onCategoryChange(itemValue)}
    >
      {categories.map(cat => (
        <Picker.Item key={cat} label={cat} value={cat} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    color: '#333',
  },
});

export default CategoryPicker;
