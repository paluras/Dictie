
import React from "react";

import { User} from "firebase/auth";

type firebaseUser = User | null       ;

export const AuthContext = React.createContext<firebaseUser>(null);