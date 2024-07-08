import React, { PropsWithChildren, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { AppDispatch } from './redux/store';
import { clearUser, setUser } from './redux/auth/authSlice';

export default function AuthListener({ children }: PropsWithChildren) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email! }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return <>{children}</>
}