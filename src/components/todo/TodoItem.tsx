import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Todo } from '../../types';

const categoryIcons: { [key: string]: string } = {
  Work: 'briefcase-outline',
  Personal: 'person-outline',
  Shopping: 'cart-outline',
  Other: 'list-outline',
};

interface TodoItemProps {
  todo: Todo;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <View style={[styles.todoItem, { backgroundColor: todo.priorityColor }]}>
      <View style={styles.todoContent}>
        <Icon name={categoryIcons[todo.category] || 'list-outline'} size={20} color="#000" />
        <Text style={styles.todoText}>{todo.text}</Text>
      </View>
      <View style={styles.todoActions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <Icon name="pencil-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Icon name="trash-outline" size={20} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  todoActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default TodoItem;
