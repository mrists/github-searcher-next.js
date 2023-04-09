import { IRepository, IUser } from "@/types/types";

export interface viewedUserState {
  viewedUsers: IUser[];
}

export interface userState {
  users: IUser[],
  repositories: IRepository[],
  fetched: boolean,
  error: string | null | undefined
}