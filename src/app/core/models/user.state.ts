import { User } from './user';
import { AuthorizationStatus } from '../constants/const';

export interface UserState {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  error: string | null;
  isLoading: boolean;
}
