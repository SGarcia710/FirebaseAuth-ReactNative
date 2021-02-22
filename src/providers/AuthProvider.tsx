import React, {createContext, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

/**
 * Context
 */
interface AuthStateContext {
  user: FirebaseAuthTypes.UserCredential | null;
  setUser: (user: FirebaseAuthTypes.UserCredential | null) => void;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  signout: () => void;
}
const initialContextValue: AuthStateContext = {
  user: null,
  setUser: (user: FirebaseAuthTypes.UserCredential | null) => {},
  signin: (email: string, password: string) => {},
  signup: (email: string, password: string) => {},
  signout: () => {},
};

export const AuthContext = createContext<AuthStateContext>(initialContextValue);

/**
 * Provider
 */
interface AuthStateProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({children}: AuthStateProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.UserCredential | null>(
    null,
  );
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signin: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log('There was an error signing in: ', error);
          }
        },
        signup: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (error) {
            console.log('There was an error signing up: ', error);
          }
        },
        signout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log('There was an error signing out:', error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
