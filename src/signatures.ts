export interface Post {
  id: number;
  title: string;
  brief: string;
  content: string;
  author: Author;
  images: Array<Image>;
  comments: Array<Comment>;
  likes: number;
}
export interface Author {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  priority: number;
}

export interface Comment {
  id: number;
  author: string;
  comment: string;
}

export interface Image {
  id: number;
  name: string;
  pathOrURL: string;
}
