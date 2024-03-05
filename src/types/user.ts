export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface CreateUserParamsProps extends Omit<User, "id"> {}
