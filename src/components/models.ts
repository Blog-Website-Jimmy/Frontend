import { Image } from 'src/signatures';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
export const getMianImage = (given: Array<Image>) => {
  const targetOject = given.filter((el) => el.name === 'Main')[0];
  console.log(targetOject?.pathOrURL);

  return targetOject.pathOrURL.substring(1);
};
