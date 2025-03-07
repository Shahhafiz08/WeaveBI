import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  name: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }: SignInParams): Promise<void> => {
  console.log('Endpoints login : ', endpoints.auth.signIn);
  try {
    const params = new FormData();
    params.append('email', email);
    params.append('password', password);

    const res = await axios.post(endpoints.auth.signIn, { email, password });

    const { access_token } = res.data;
    console.log('Access token', access_token);
    if (!access_token) {
      throw new Error('Access token not found in response');
    }

    setSession(access_token);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({ name, email, password }: SignUpParams): Promise<void> => {
  const params = {
    name,
    email,
    password,
  };

  try {
    await axios.post('/auth/register', params);

    // const { accessToken } = res.data;

    // if (!accessToken) {
    //   throw new Error('Access token not found in response');
    // }

    // sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
