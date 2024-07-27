import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Todo } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete }) => {
  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={[styles.todoText, { backgroundColor: item.priorityColor }]}>{item.text}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.iconButton}>
          <Icon name="edit" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.iconButton}>
          <Icon name="trash" size={20} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  todoItem: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoText: {
    fontSize: 18,
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default TodoList;
