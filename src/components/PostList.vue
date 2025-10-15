<template>
  <div class="post-list">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :comments="post.comments"
      :showComments="post.showComments"
      @deletePost="handleDeletePost"
      @updatePost="handleUpdatePost"
      @addComment="handleAddComment"
      @removeComment="handleRemoveComment"
      @toggleComments="handleToggleComments"
    />
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  components: {
    PostItem
  },
  props: {
    posts: Array
  },
  emits: ['deletePost', 'updatePost', 'addComment', 'removeComment', 'toggleComments'],
  methods: {
    handleDeletePost(postId) {
      this.$emit('deletePost', postId);
    },
    handleUpdatePost(postId, newTitle) {
      this.$emit('updatePost', postId, newTitle);
    },
    handleAddComment(postId, commentText) {
      this.$emit('addComment', postId, commentText);
    },
    handleRemoveComment(postId, commentId) {
      this.$emit('removeComment', postId, commentId);
    },
    handleToggleComments(postId) {
      this.$emit('toggleComments', postId);
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>