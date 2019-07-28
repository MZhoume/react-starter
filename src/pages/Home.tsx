import React from 'react';
import Screen from '../components/screen';
import { useStore } from '../store';

export default function(): JSX.Element {
  const user = useStore(state => state.userStore.user);

  return (
    <Screen>{user ? <h2>Hello {user.firstName}</h2> : <h2>Welcome</h2>}</Screen>
  );
}
