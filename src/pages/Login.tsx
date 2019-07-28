import React, { FormEvent, ChangeEvent, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import Screen from '../components/screen';
import { useAction, useStore } from '../store';

interface LogInState {
  email: string;
  password: string;
}

export default function(): JSX.Element {
  const [state, setState] = useState<LogInState>({
    email: '',
    password: ''
  });

  const user = useStore(state => state.userStore.user);
  const logIn = useAction(actions => actions.userStore.logIn);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    logIn(state);
  };

  const handleChange = (name: keyof LogInState) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.value });
  };

  return (
    <Screen>
      {user ? (
        <h2>Hello {user.firstName}</h2>
      ) : (
        <form noValidate autoComplete="off" onSubmit={submit}>
          <TextField
            id="email"
            label="Email"
            value={state.email}
            onChange={handleChange('email')}
            fullWidth
            margin="normal"
            style={{ display: 'block' }}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            value={state.password}
            onChange={handleChange('password')}
            fullWidth
            margin="normal"
            style={{ display: 'block' }}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Log In
          </Button>
        </form>
      )}
    </Screen>
  );
}
