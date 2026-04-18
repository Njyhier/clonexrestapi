export class Params {
  id?: string;
  postId?: string;
  userId?: string;
  followingId?: string;
  followerId?: string;
}
export interface Token {
  userId?: string;
}

export type Query = {
  userId?: string;
  age?: string;
  email?: string;
};
