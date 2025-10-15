import { ref } from 'vue';

export function usePostStore() {
  const posts = ref([
    {
      id: 1,
      title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
      comments: [
        { id: 1, text: "Первый комментарий о выше сказанном посте ..." },
        { id: 2, text: "Второй комментарий о выше сказанном посте ..." }
      ],
      showComments: false
    },
    {
      id: 2,
      title: "Краткосрочное вымышленное преломление может выполнять особую роль в пространстве главной роли игрока",
      comments: [
        { id: 1, text: "Очень научно и непонятно" },
      ],
      showComments: false
    }
  ]);

  const addPost = (title) => {
    const newPost = {
      id: Date.now(),
      title,
      comments: [],
      showComments: false
    };
    posts.value.unshift(newPost);
  };

  const removePost = (id) => {
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
    removePost,
    updatePost,
    addComment,
    removeComment,
    toggleComments
  };
}