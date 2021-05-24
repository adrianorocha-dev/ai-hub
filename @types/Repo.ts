import { User } from "./User";

enum RepoVisibility {
  Public,
  Private,
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  visibility: RepoVisibility;
  owner: User;
}
