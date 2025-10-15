<template>
  <div class="post-form">
    <div class="form-container">
      <input 
        v-model="postText" 
        placeholder="Новый пост..."
        class="post-input"
      />
      <button @click="handleSubmit" class="add-btn">Добавить</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(_, { emit }) {
    const postText = ref('');

    const handleSubmit = () => {
      if (postText.value.trim()) {
        emit('addPost', postText.value.trim());
        postText.value = '';
      }
    };

    return {
      postText,
      handleSubmit
    };
  }
}
</script>

<style scoped>
.post-form {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 2px solid #e0f7ff;
}

.form-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.post-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.post-input:focus {
  outline: none;
  border-color: #007bff;
}

.add-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px; 
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
}

.add-btn:hover {
  background: #0056b3;
}
</style>