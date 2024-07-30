import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; // Adjust the path as necessary
import { doc, setDoc } from 'firebase/firestore';
// import { registerSuccess } from './authSlice';

export const registerUser = createAsyncThunk<
  SimpleUser,
  RegisterData,
  { rejectValue: string }
>(
  'auth/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email,
        userId: user.uid,
        name: name
      });
      // console.log("user ---> ", user)
      return { uid: user.uid, email: user.email!, success: true };
    } catch (error: any) {
      console.log("error ---> ", error)
      // let msg = error.message
      // if(msg.includes(''))
      return rejectWithValue(error.message);
    }
  }
);

// export const registerUser = (userData: RegisterData) => async (dispatch: any) => {
//   // dispatch(authLoading());
//   try {
//     await createUserWithEmailAndPassword(auth, userData.email, userData.password)
//       .then((userAuth) => {
//         dispatch(
//           registerSuccess({
//             email: userAuth.user.email,
//             uid: userAuth.user.uid,
//           })
//         )
//       })
//   } catch (error) {
//     console.log("error ---> ", error)
//     // dispatch(registerFailure(error.message));
//   }
// }

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
