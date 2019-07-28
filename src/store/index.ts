import { createStore, createTypedHooks } from 'easy-peasy';
import { AppStore } from './types';
import { userStore } from './modules/user.module';
import { composeWithDevTools } from 'redux-devtools-extension';

const appStore: AppStore = {
  userStore
};

const store = createStore(appStore, {
  compose: composeWithDevTools({})
});
const hooks = createTypedHooks<AppStore>();

const useAction = hooks.useStoreActions;
const useDispatch = hooks.useStoreDispatch;
const useStore = hooks.useStoreState;

export { useAction, useDispatch, useStore };
export default store;
