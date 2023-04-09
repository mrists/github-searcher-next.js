import { IRepository, User } from "@/types/types";

export interface UserDetailsProps {
  user: User;
  repositories: IRepository[],
  error?: string
};