import { onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

interface AuthContextProps {
    user: SimpleUser | null;
    isAuthenticated: boolean;
    // setIsAuthenticated: (value: boolean) => void;
    registerWithContext: (email: string, password: string) => void;
    loginWithContext: (email: string, password: string) => void;
    logoutWithContext: () => void; 
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<SimpleUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user as SimpleUser);
                // setUser({ uid: user.uid, email: user.email! });
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, []);

    const registerWithContext = async (email: string, password: string) => {
        // console.log("email: string, password: string ---> ", email, password)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            return { data: user, success: true };
          } catch (error: any) {
            console.log("error ---> ", error)
          }
    }
    
    const loginWithContext = async (email: string, password: string) => {
        console.log("email: string, password: string ", email, password)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("user ---> ", user)
            return { data: user, success: true };
          } catch (error: any) {
            console.log("error ---> ", error)
          }
    }

     const logoutWithContext = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

    return (
        <AuthContext.Provider value={{
            user, isAuthenticated, registerWithContext, loginWithContext, logoutWithContext
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
