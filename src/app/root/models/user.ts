export interface User {
  _id?: string;
  username: string;
  email: string;
  fullname: string;
  password?: string;
  isAdmin?: boolean;
}