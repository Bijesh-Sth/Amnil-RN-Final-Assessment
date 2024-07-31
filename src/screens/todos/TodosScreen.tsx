import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, FlatList, Pressable, Animated, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoForm, TodoItem } from '../../components';
import { Todo } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

const TodosScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<string>('alphabetical');
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const filterAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    Animated.timing(filterAnim, {
      toValue: isFilterVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFilterVisible]);

  const loadTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');
      if (jsonValue != null) {
        setTodos(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveTodo = async (todo: Todo) => {
    const updatedTodos = selectedTodo
      ? todos.map(t => (t.id === todo.id ? todo : t))
      : [...todos, todo];
    setTodos(updatedTodos);
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    setSelectedTodo(null);
    setIsFormVisible(false);
  };

  const deleteTodo = async (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteAllTodos = async () => {
    setTodos([]);
    await AsyncStorage.removeItem('todos');
  };

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsFormVisible(true);
  };

  const handleAddTodo = () => {
    setSelectedTodo(null);
    setIsFormVisible(true);
  };

  const sortTodos = (todos: Todo[], criteria: string) => {
    return todos.sort((a, b) => {
      if (criteria === 'alphabetical') {
        return a.text.localeCompare(b.text);
      } else if (criteria === 'category') {
        return a.category.localeCompare(b.category);
      } else if (criteria === 'priority') {
        return a.priority.localeCompare(b.priority);
      }
      return 0;
    });
  };

  const filteredTodos = sortTodos(todos, sortCriteria).filter(todo => 
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const filterOptions = [
    { label: 'Alphabetical', value: 'alphabetical', icon: 'sort-alpha-asc' },
    { label: 'Category', value: 'category', icon: 'tags' },
    { label: 'Priority', value: 'priority', icon: 'exclamation-triangle' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onEdit={() => handleEditTodo(item)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        ListHeaderComponent={
          <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeaderText}>Todo List</Text>
          </View>
        }
      />
      <Animated.View
        style={[
          styles.filterDropdown,
          {
            transform: [
              {
                translateY: filterAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0], 
                }),
              },
            ],
          },
        ]}
      >
        {filterOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={styles.filterOption}
            onPress={() => {
              setSortCriteria(option.value);
              setIsFilterVisible(false);
            }}
          >
            <Icon name={option.icon} size={20} color="#000" />
            <Text style={styles.filterOptionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search todos..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
            <Icon name="plus" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.removeAllButton]} onPress={deleteAllTodos}>
            <Icon name="trash" size={20} color="#fff" />
            <Text style={styles.buttonText}>Remove All</Text>
          </TouchableOpacity>
          <Pressable style={styles.filterButton} onPress={() => setIsFilterVisible(!isFilterVisible)}>
            <Icon name="filter" size={20} color="#fff" />
            <Text style={styles.buttonText}>Filter</Text>
          </Pressable>
        </View>
      </View>
      <Modal
        visible={isFormVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TodoForm
              todo={selectedTodo}
              onSave={saveTodo}
            />
            <TouchableOpacity
              onPress={() => setIsFormVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listHeaderContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  removeAllButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  filterDropdown: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    maxHeight: 200,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  filterOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cancelButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TodosScreen;
