import axios from 'axios';
import { useArticleStore } from './stores/article-store';
import { EventBus } from 'quasar';
import { Category } from './signatures';

const url = process.env.API;
const article_store = useArticleStore();

export const getPosts = (page: number, size: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + 'article/get-all', {
        params: {
          page: page,
          size: size,
        },
      })
      .then((res) => {
        article_store.posts = res.data.articles;
        resolve(res.data.totalPages);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getCategoryPosts = (
  page: number,
  size: number,
  category: string
): Promise<number> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + 'category/articles', {
        params: {
          page: page,
          size: size,
          category: category,
        },
      })
      .then((res) => {
        article_store.posts = res.data.articles;
        resolve(res.data.totalPages);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const loginUser = (
  username: string,
  password: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'auth/login', { username: username, password: password })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + 'category/get-all')
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAuthors = (): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + 'author/get-all')
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const postArticle = (
  title: string,
  brief: string,
  author: any,
  content: string,
  category: any,
  imageIds: Array<string>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'article/save', {
        title: title,
        brief: brief,
        authorId: author.id,
        content: content,
        categoryId: category.id,
        imageIds: imageIds,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const bus = new EventBus();
