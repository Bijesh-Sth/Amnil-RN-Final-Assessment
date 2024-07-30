import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Post } from '../../types';

interface PostItemProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onEdit, onDelete }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{post.title}</Text>
    <Text>{post.body}</Text>
    <View style={styles.actions}>
      <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
        <Icon name="edit" size={20} color="#007bff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
        <Icon name="trash" size={20} color="#ff0000" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 15,
  },
});

export default PostItem;
