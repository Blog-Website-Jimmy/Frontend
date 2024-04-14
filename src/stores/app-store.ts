import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    categories: [],
    sideBarMenuOff: false,
  }),

  getters: {
    getCategories: (state) => state.categories,
    getSideBarMenuOff: (state) => state.sideBarMenuOff,
  },

  actions: {
    setCategories(categories: any) {
      this.categories = categories;
    },
  },
});
