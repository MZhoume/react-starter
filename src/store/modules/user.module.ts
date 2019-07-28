import { Action, thunk, action } from 'easy-peasy';
import { User } from '../../models/user';
import { ThunkAction } from '../types';
import http from '../../utils/http';
import {
  LogInRequestModel,
  LogInResponseModel
} from '../../../server/features/user/models/user.models';

export interface UserStore {
  user?: User;

  logIn: ThunkAction<UserStore, LogInRequestModel, void>;
  logInSuccess: Action<UserStore, LogInResponseModel>;
}

export const userStore: UserStore = {
  user: undefined,

  logIn: thunk(async (actions, payload) => {
    const res = await http.post<LogInResponseModel>('user/login', payload);
    actions.logInSuccess(res.data);
  }),
  logInSuccess: action((state, payload) => {
    state.user = payload;
  })
};
