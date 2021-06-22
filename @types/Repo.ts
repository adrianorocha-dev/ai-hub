import { User } from "./User";

export enum RepoVisibility {
  Public,
  Private,
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  visibility: RepoVisibility;
  owner: User;
  members: User[];
}
