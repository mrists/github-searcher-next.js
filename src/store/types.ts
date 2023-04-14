import { IRepository, IUser } from "@/types/types";

export interface viewedUserState {
  viewedUsers: IUser[];
}

export interface userState {
  users: IUser[],
  user: IUser | null,
  repositories: IRepository[],
  fetched: boolean,
  usersError: string | null | undefined,
  userDetailsError: string | null | undefined
}

export interface FetchUserDetailsReturnType {
  user: IUser;
  repositories: IRepository[];
};