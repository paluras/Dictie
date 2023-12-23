import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { signInWithGoogle, signOutUser } from "../utils/firebase";

type HeaderProps = {
  backButton: ReactNode;
};

const Header: React.FC<HeaderProps> = ({
  backButton,
}: {
  backButton: ReactNode;
}) => {
  const user = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImageSrc, setUserImageSrc] = useState("");

  useEffect(() => {
    if (user) {
      // User is signed in

      setUserImageSrc(user.photoURL || "");
      setLoggedIn(true);
      console.log("User is signed in:", user.displayName);
    } else {
      // User is signed out
      setUserImageSrc("");

      setLoggedIn(false);
      console.log("No user is signed in.");
    }
  }, [user]);

  return (
    <header>
      <Link style={{ color: "#1a1908" }} to="/">
        <h1 className="logo">Dicție!</h1>
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
            <button type="button" className="signin" onClick={() => signOutUser()}>
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
