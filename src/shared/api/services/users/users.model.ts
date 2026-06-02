export interface BasicUser {
  id: string;
  username: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

// Requests

export type User_Create_Request = Pick<BasicUser, 'username'> & {
  password: string;
  balance?: number;
};

export type User_Update_Request = Pick<BasicUser, 'id' | 'username'> &
  Partial<Pick<BasicUser, 'balance'>>;
