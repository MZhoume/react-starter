import React, { useState, ChangeEvent, FormEvent } from 'react';
import http from '../utils/http';
import { TextField, Button } from '@material-ui/core';
import Screen from '../components/screen';
import {
  SignUpRequestModel,
  SignUpResponseModel
} from '../../server/features/user/models/user.models';

interface SignUpState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function(): JSX.Element {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [state, setState] = useState<SignUpState>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: SignUpRequestModel = state;
    const res = await http.post<SignUpResponseModel>('user/signup', user);
    setUserId(res.data.id);
  };

  const handleChange = (name: keyof SignUpState) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.value });
  };

  return (
    <Screen>
      {userId ? (
        <h2>Hello {userId}</h2>
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

          <TextField
            id="firstName"
            label="First Name"
            value={state.firstName}
            onChange={handleChange('firstName')}
            fullWidth
            margin="normal"
            style={{ display: 'block' }}
          />

          <TextField
            id="lastName"
            label="Last Name"
            value={state.lastName}
            onChange={handleChange('lastName')}
            fullWidth
            margin="normal"
            style={{ display: 'block' }}
          />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
      )}
    </Screen>
  );
}
