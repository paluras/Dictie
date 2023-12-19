
import React from "react";
import firebase from "firebase/app";

type firebaseUser = User | null       ;

export const AuthContext = React.createContext<firebase.User | null>(null);