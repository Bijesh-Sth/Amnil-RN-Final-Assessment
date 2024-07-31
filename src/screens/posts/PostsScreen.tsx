import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, FlatList, Pressable, Animated, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchPosts } from '../../redux/actions/postActions';
import { addPost, editPost, deletePost, setPage, removeAllPosts } from '../../redux/reducers/postReducer';
import { PostForm, PostItem } from '../../components';
import { Post } from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, page } = useSelector((state: RootState) => state.posts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const filterAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  useEffect(() => {
    Animated.timing(filterAnim, {
      toValue: filterActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [filterActive]);

  const handleSavePost = (post: Post) => {
    if (selectedPost) {
      dispatch(editPost(post));
    } else {
      dispatch(addPost(post));
    }
    setIsFormVisible(false);
  };

  const handleDeletePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(removeAllPosts()); // Clear the posts for refresh
    dispatch(setPage(1)); // Reset to page 1 for refresh
    dispatch(fetchPosts(1)).finally(() => setRefreshing(false));
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      dispatch(setPage(page + 1));
      dispatch(fetchPosts(page + 1)).finally(() => setLoadingMore(false));
    }
  };

  const filteredPosts = filterActive
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : posts;

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.uniqueId.toString()}
          renderItem={({ item }) => (
            <PostItem
              post={item}
              onEdit={() => {
                setSelectedPost(item);
                setIsFormVisible(true);
              }}
              onDelete={() => handleDeletePost(item.id)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={
            <View style={styles.listHeaderContainer}>
              <Text style={styles.listHeaderText}>Posts</Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footerContainer}>
              <TouchableOpacity style={styles.getMoreButton} onPress={handleLoadMore}>
                <Text style={styles.getMoreButtonText}>Get More Posts</Text>
              </TouchableOpacity>
              {renderFooter()}
            </View>
          }
        />
      )}
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
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterActive(!filterActive)}
        >
          <Icon name="filter" size={20} color="#000" />
          <Text style={styles.filterButtonText}>{filterActive ? 'Show All' : 'Filter'}</Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Posts..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedPost(null);
            setIsFormVisible(true);
          }}
        >
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isFormVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <PostForm
              post={selectedPost}
              onSave={handleSavePost}
              onCancel={() => setIsFormVisible(false)}
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  footerContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
    alignItems: 'center',
  },
  getMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  getMoreButtonText: {
    color: '#fff',
    fontSize: 16,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  filterButtonText: {
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
  footer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostsScreen;
