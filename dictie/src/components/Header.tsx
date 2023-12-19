import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { useContext } from "react";
import { signInWithGoogle, signOutUser } from "../utils/firebase";


type HeaderProps = {
  backButton: ReactNode;
};

const Header: React.FC<HeaderProps> = ({backButton}) => {
  const user = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userImageSrc, setUserImageSrc] = React.useState("");
  console.log(userName);

// refactor this!!!!!!!!!!!!!!!!
  React.useEffect(() => {
    if (user) {
      // User is signed in
     
      setUserName(user.displayName || "");
      setUserImageSrc(user.photoURL || "");
      setLoggedIn(true);
      console.log("User is signed in:", user.displayName);
    } else {
      // User is signed out
      setUserImageSrc("");
      setUserName("");
      setLoggedIn(false);
      console.log("No user is signed in.");
    }
  }, [user]);

  return (
    <header>
      <Link style={{ color: "#1a1908" }} to="/">
        <h1
          className="logo"
        >
          Dicție!
        </h1>
      </Link>
   
      <div className="right-header">
        {backButton}

        {!loggedIn && (
          <button className="signin" onClick={() => signInWithGoogle()}>
            Log in
          </button>
        )}

        {loggedIn && (
          <>
            <button className="signin" onClick={() => signOutUser()}>
              Log out{" "}
            </button>
            <img
              style={{
                width: "32px",
                borderRadius: "100px",
                border: "2px solid #d0deff",
              }}
              src={userImageSrc}
              alt="profile pic"
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
