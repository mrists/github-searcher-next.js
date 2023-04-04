import { IRepository, User } from "@/types/types";

export type UserDetailsProps = {
  user: User;
  repositories: IRepository[],
  error?: string
};