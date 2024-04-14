import axios from 'axios';
import { useArticleStore } from './stores/article-store';
import { EventBus } from 'quasar';
import { Category, Post } from './signatures';

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
        article_store.posts = res.data.content;
        resolve(res.data.totalPages);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getTOpPosts = (): Promise<Array<Post>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + 'article/top-articles')
      .then((res) => {
        article_store.topPosts = res.data;
        resolve(res.data);
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

export const addComment = (
  author: string,
  comment: string,
  articleId: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'article/add-comment', {
        author: author,
        comment: comment,
        articleId: articleId,
      })
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

export const updateArticle = (
  title: string,
  brief: string,
  author: any,
  content: string,
  category: any,
  imageIds: Array<string>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'article/update', {
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

export const likeArticle = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'article/like/' + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const dislikeArticle = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'article/dislike/' + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteArticle = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url + 'article/delete/' + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addCategory = (
  name: string,
  priority: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'category/add', { name, priority })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateCategory = (
  name: string,
  id: number,
  priority: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + 'category/update/' + id, { name, priority })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteCategory = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url + 'category/delete/' + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const deleteImage = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url + 'article/delete/image/' + id)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getOneArticle = (title: string): Promise<Post> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + 'article/get-one', { params: { title: title } })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const searchPost = (
  keyword: string,
  page: number,
  size: number
): Promise<number> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + 'article/search/' + keyword, {
        params: {
          page: page,
          size: size,
        },
      })
      .then((res) => {
        console.log(res.data.articles);
        article_store.posts = res.data.articles;
        resolve(res.data.totalPages);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const bus = new EventBus();
