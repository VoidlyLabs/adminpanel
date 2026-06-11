export interface BasicUser {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

// Requests

export type User_Create_Request = Pick<BasicUser, 'username'> & {
  password: string;
};

export type User_Update_Request = Pick<BasicUser, '_id' | 'username'>;
