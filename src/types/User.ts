import { HIITSet } from 'types';
import { User as FBUser } from 'firebase/auth';

export type User = Partial<FBUser> & {
  authProvider: string;
  email: string;
  name: string;
  presets: HIITSet[];
  userID: string;
};
