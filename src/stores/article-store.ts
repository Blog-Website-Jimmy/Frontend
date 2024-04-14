import { defineStore } from 'pinia';
import { Post } from 'src/signatures';

export const useArticleStore = defineStore('article', {
  state: () => ({
    posts: [] as Array<Post>,
    topPosts: [] as Array<Post>,
    page: 0,
    size: 9,
    totalPages: 0,
    counter: 0,
  }),
  getters: {
    getPosts: (state) => state.posts,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
