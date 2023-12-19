import  {auth}  from './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';


console.log(auth);

export const signInWithGoogle = async (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return await auth.signInWithPopup(provider);
};

export const signOut = async (): Promise<void> => {
  return await auth.signOut();
};

export const getCurrentUser = (): firebase.User | null => {
  return auth.currentUser;
};