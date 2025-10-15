<template>
  <article class="post">
    <div class="post-content">
      <p>{{ title }}</p>
    </div>
    
    <div class="post-actions">
      <div class="comments-info">
        <button @click="toggleComments" class="comments-btn">Комментарии</button>
        <span class="comments-count">Количество комментарий - {{ comments.length }}</span>
      </div>
      <div class="post-buttons">
        <button @click="editPost" class="edit-btn">Изменить</button>
        <button @click="deletePost" class="delete-btn">Удалить</button>
      </div>
    </div>
    
    <div v-if="showComments" class="comments-section">
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <div class="comment-content">
            <p>{{ comment.text }}</p>
          </div>
          <button @click="removeComment(comment.id)" class="comment-delete">Удалить</button>
        </div>
      </div>
      
      <div class="comment-form">
        <input
          v-model="newComment"
          @keyup.enter="addComment"
          placeholder="Новый комментарий..."
          class="comment-input"
        />
        <button @click="addComment" class="comment-add-btn">Добавить</button>
      </div>
      
      <div class="hide-comments">
        <button @click="toggleComments" class="hide-btn">Спрятать</button>
      </div>
    </div>

    <div v-if="isEditing" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <textarea v-model="editText" class="modal-textarea"></textarea>
        <div class="modal-actions">
          <button @click="saveChanges" class="confirm-btn">Подтвердить</button>
          <button @click="closeModal" class="close-btn">Закрыть</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    id: Number,
    title: String,
    comments: Array,
    showComments: Boolean
  },
  emits: ['deletePost', 'updatePost', 'addComment', 'removeComment', 'toggleComments'],
  setup(props, { emit }) {
    const isEditing = ref(false);
    const editText = ref('');
    const newComment = ref('');

    const deletePost = () => {
      emit('deletePost', props.id);
    };

    const editPost = () => {
      editText.value = props.title;
      isEditing.value = true;
    };

    const closeModal = () => {
      isEditing.value = false;
    };

    const saveChanges = () => {
      emit('updatePost', props.id, editText.value);
      closeModal();
    };

    const toggleComments = () => {
      emit('toggleComments', props.id);
    };

    const addComment = () => {
      if (newComment.value.trim()) {
        emit('addComment', props.id, newComment.value.trim());
        newComment.value = '';
      }
    };

    const removeComment = (commentId) => {
      emit('removeComment', props.id, commentId);
    };

    return {
      isEditing,
      editText,
      newComment,
      deletePost,
      editPost,
      closeModal,
      saveChanges,
      toggleComments,
      addComment,
      removeComment
    };
  }
}
</script>

<style scoped>
.post {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 2px solid #e0f7ff;
}

.post-content {
  margin-bottom: 15px;
}

.post-content p {
  margin: 0;
  line-height: 1.6;
  color: #333;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.comments-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.comments-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

.comments-btn:hover {
  background: #0056b3;
}

.comments-count {
  color: #666;
  font-size: 0.9rem;
}

.post-buttons {
  display: flex;
  gap: 10px;
}

.edit-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

.edit-btn:hover {
  background: #0056b3;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

.delete-btn:hover {
  background: #c82333;
}

.comments-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.comments-list {
  margin-bottom: 20px;
}

.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 2px solid #e0f7ff;
}

.comment-content {
  flex: 1;
}

.comment-content p {
  margin: 0;
  color: #333;
}

.comment-delete {
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.comment-delete:hover {
  background: #c82333;
}

.comment-form {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.comment-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
}

.comment-input:focus {
  outline: none;
  border-color: #007bff;
}

.comment-add-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.comment-add-btn:hover {
  background: #0056b3;
}

.hide-comments {
  display: flex;
}

.hide-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

.hide-btn:hover {
  background: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  border: 2px solid #e0f7ff;
}

.modal-textarea {
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 15px;
}

.modal-textarea:focus {
  outline: none;
  border-color: #007bff;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.confirm-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

.confirm-btn:hover {
  background: #0056b3;
}

.close-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
}

.close-btn:hover {
  background: #c82333;
}
</style>