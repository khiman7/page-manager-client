import { useEffect } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { ILoginBody, ILoginResponse } from '../../types';
import { useAuth } from '../../context/AuthProvider';
import authService from '../../services/auth.service';

import styles from './Login.module.css';

export default function Login() {
  const { register, watch, handleSubmit } = useForm();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  async function onSubmit(credentials: ILoginBody) {
    try {
      const { token }: ILoginResponse = await authService.login(credentials);
      login(token);
      navigate('/admin');
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Paper className={styles['login-form']}>
        <h1>🔐 Login</h1>
        <form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => onSubmit(data as ILoginBody))}
        >
          <TextField
            {...register('username', { required: true })}
            margin="normal"
            label="Username"
            variant="outlined"
          />
          <TextField
            {...register('password', { required: true })}
            margin="normal"
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="on"
          />
          <Button
            sx={{
              marginTop: '16px',
              padding: '12px',
              background: '#362b2b',
              ':hover': {
                background: '#554242',
              },
              fontSize: '16px',
            }}
            type="submit"
            variant="contained"
          >
            <b>Login</b>
          </Button>
        </form>
      </Paper>
    </div>
  );
}
