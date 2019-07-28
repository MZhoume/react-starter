import { Thunk } from 'easy-peasy';
import { UserStore } from './modules/user.module';

export interface AppStore {
  userStore: UserStore;
}

export type ThunkAction<S extends object, P, R> = Thunk<
  S,
  P,
  {},
  AppStore,
  Promise<R>
>;
