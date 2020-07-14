export interface User {
  _id?: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  isAdmin?: boolean;
}