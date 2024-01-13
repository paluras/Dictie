import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect,  useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signInWithGoogle, signOutUser } from "../utils/firebase";

type HeaderProps = {
  backButton: ReactNode;
  logInBtn:boolean
};

const Header: React.FC<HeaderProps> = ({
  backButton,
  logInBtn
}: {
  backButton: ReactNode;
  logInBtn:boolean
}) => {
  const user = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userImageSrc, setUserImageSrc] = useState("");

  useEffect(() => {
    if (user) {
      setUserImageSrc(user.photoURL || "");
      setLoggedIn(true);
      console.log("User is signed in:", user.displayName);
    } else {
      setUserImageSrc("");
      setLoggedIn(false);
      console.log("No user is signed in.");
    }
  }, [user]);

  const LogInBtn = () => {
    return (
      <button
        type="button"
        className="signin"
        onClick={() => signInWithGoogle()}
      >
        Log in
      </button>
    );
  };

  const LogOutBtn = () => {
    return (
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
    );
  };


  const CreateExercise = () => {
    return(
      <>
      <Link to="/create-exercise">
        <button type="button">Creează exercițiu</button>
      </Link>
      </>
    )
  }


  return (
    <header>
      <Link style={{ color: "#1a1908" }} to="/">
        <h1 className="logo">Dicție!</h1>
      </Link>

      <div className="right-header">
        {backButton}
    
        {!loggedIn && logInBtn  && <LogInBtn />}
        {loggedIn && logInBtn && <CreateExercise />}
        {loggedIn && logInBtn && <LogOutBtn />}
      
   
      </div>
    </header>
  );
};

export default Header;
