import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import PriorityPicker from './PriorityPicker';
import CategoryPicker from './CategoryPicker';
import { Todo, Priority } from '../../types';

const priorities: Record<Priority, string> = {
  Low: '#6AB98E',    
  Medium: '#6CA6CD', 
  High: '#FFB347',   
};

interface TodoFormProps {
  todo?: Todo;
  onSave: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSave }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('Low');
  const [category, setCategory] = useState('Work');

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setPriority(todo.priority);
      setCategory(todo.category);
    }
  }, [todo]);

  const handleSave = () => {
    const newTodo = {
      id: todo?.id || Date.now().toString(),
      text,
      priority,
      priorityColor: priorities[priority],
      category,
    };
    onSave(newTodo);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Todo"
        placeholderTextColor="#333"
        value={text}
        onChangeText={setText}
      />
      <PriorityPicker selectedPriority={priority} onPriorityChange={setPriority} />
      <CategoryPicker selectedCategory={category} onCategoryChange={setCategory} />
      <Button title="Save Todo" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#333', 
    marginBottom: 20,
    padding: 10,
    color: '#333',
  },
});

export default TodoForm;
