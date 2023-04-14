import { IRepository, IUser } from "@/types/types";

export interface UserDetailsProps {
  user: IUser;
  repositories: IRepository[],
  error?: string
};