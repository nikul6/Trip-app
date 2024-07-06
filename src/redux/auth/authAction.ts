import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the path as necessary

export const registerUser = createAsyncThunk<
  SimpleUser,
  RegisterData,
  { rejectValue: string }
>(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user ---> ", user)
      return { uid: user.uid, email: user.email!, success: true };
    } catch (error: any) {
      console.log("error ---> ", error)
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk<
  SimpleUser,
  RegisterData,
  { rejectValue: string }
>(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { uid: user.uid, email: user.email!, success: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
