import { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  User,
} from 'firebase/auth';
import { IAuthContext } from '../interfaces/interfaces';

// default value for auth context provided to clear up TS errors - not sure if this is best approach.
export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  signup: async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      // implementation for signup
    });
  },
  login: async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      // implementation for login
    });
  },
  logout: async () => {
    return new Promise((resolve, reject) => {
      // implementation for logout
    });
  },
  resetPassword: async (email: string) => {
    return new Promise((resolve, reject) => {
      // implementation for resetPassword
    });
  },
  setNewEmail: async (currentUser: User | null, email: string) => {
    return new Promise((resolve, reject) => {
      // implementation for setNewEmail
    });
  },
  setNewPassword: async (currentUser: User | null, newPassword: string) => {
    return new Promise((resolve, reject) => {
      // implementation for setNewPassword
    });
  },
  googleLogin: async () => {
    return new Promise((resolve, reject) => {
      // implementation for googleLogin
    });
  },
  deleteAccount: async (currentUser: User | null) => {
    return new Promise((resolve, reject) => {
      // implementation for deleteAccount
    });
  },
  modal: false,
  setModal: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function setNewEmail(currentUser: User, email: string) {
    return updateEmail(currentUser, email);
  }

  function setNewPassword(currentUser: User, newPassword: string) {
    return updatePassword(currentUser, newPassword);
  }

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function deleteAccount(currentUser: User) {
    return deleteUser(currentUser);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    setNewEmail,
    setNewPassword,
    googleLogin,
    deleteAccount,
    modal,
    setModal,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
