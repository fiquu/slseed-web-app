export interface UserModel {
  name: string;
  sub: string;
  _id: string;
}

export interface UsersState {
  users: UserModel[];
}

export default {
  users: []
} as UsersState;
