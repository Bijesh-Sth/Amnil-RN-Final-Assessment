import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, FlatList, TextInput, RefreshControl, ActivityIndicator, Animated } from 'react-native';
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
    dispatch(removeAllPosts()); 
    dispatch(setPage(1)); 
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
          contentContainerStyle={filterActive ? styles.listWithFilter : null}
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
                  outputRange: [-300, 0], 
                }),
              },
            ],
          },
        ]}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search Posts..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </Animated.View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterActive(!filterActive)}
        >
          <Icon name="filter" size={20} color="#000" />
          <Text style={styles.filterButtonText}>{filterActive ? 'Hide Filter' : 'Show Filter'}</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cancelButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  footerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  getMoreButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  getMoreButtonText: {
    color: '#fff',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
  filterDropdown: {
    position: 'absolute',
    width: '100%',
    top: 0,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  listWithFilter: {
    marginTop: 100, 
  },
});

export default PostsScreen;
