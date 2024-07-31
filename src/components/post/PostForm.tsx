import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Post } from '../../types';

interface PostFormProps {
  post: Post | null;
  onSave: (post: Post) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSave }) => {
  const [title, setTitle] = useState(post ? post.title : '');
  const [body, setBody] = useState(post ? post.body : '');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = () => {
    const newPost: Post = {
      id: post ? post.id : Math.random(),
      title,
      body,
    };
    onSave(newPost);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#333"
      />
      <Text style={styles.label}>Body</Text>
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={setBody}
        placeholderTextColor="#333"
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#333',
  },
});

export default PostForm;
