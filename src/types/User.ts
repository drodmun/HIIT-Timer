import { HIITSet } from 'types';
import { User as FBUser } from 'firebase/auth';

export type User = FBUser & {
  authProvider: string;
  email: string;
  name: string;
  presets: HIITSet[];
  userID: string;
};
