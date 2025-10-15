<template>
  <div class="app">
    <PostForm @addPost="addPost" />
    <PostList 
      :posts="posts" 
      @deletePost="deletePost"
      @updatePost="updatePost"
      @addComment="addComment"
      @removeComment="removeComment"
      @toggleComments="toggleComments"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import { usePostStore } from './stores/postStore';

export default {
  components: {
    PostForm,
    PostList,
  },
  setup() {
    const postStore = usePostStore();
    const posts = ref([...postStore.posts.value]);

    const addPost = (title) => {
      const newPost = {
        id: Date.now(),
        title,
        comments: [],
        showComments: false
      };
      posts.value.unshift(newPost);
    };

    const deletePost = (id) => {
      posts.value = posts.value.filter(post => post.id !== id);
    };

    const updatePost = (id, newTitle) => {
      const post = posts.value.find(post => post.id === id);
      if (post) {
        post.title = newTitle;
      }
    };

    const addComment = (postId, text) => {
      const post = posts.value.find(post => post.id === postId);
      if (post) {
        const newComment = {
          id: Date.now(),
          text
        };
        post.comments.push(newComment);
      }
    };

    const removeComment = (postId, commentId) => {
      const post = posts.value.find(post => post.id === postId);
      if (post) {
        post.comments = post.comments.filter(comment => comment.id !== commentId);
      }
    };

    const toggleComments = (postId) => {
      const post = posts.value.find(post => post.id === postId);
      if (post) {
        post.showComments = !post.showComments;
      }
    };

    return { 
      posts, 
      addPost, 
      deletePost,
      updatePost,
      addComment,
      removeComment,
      toggleComments
    };
  },
};
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
  min-height: 100vh;
}
</style>