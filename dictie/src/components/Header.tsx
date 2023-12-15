import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

// import CircleSVG from "./animations/CircleSVG";

type HeaderProps = {
  backButton: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ backButton }) => {

  return (
    <header>
      <Link style={{color:"#1a1908"}} to="/"> 
      <h1
        className="logo"
        style={
          {
            //   position: "absolute",
            //   left: "10px",
            //   top: "5px",
            //   margin: "0",
          }
        }
      >
        Dicție!
      </h1>
      </Link>
      {/* <CircleSVG animationKey={animationKey} /> */}
      <div className="right-header">
     {backButton}
      </div>
   
    </header>
  );
};

export default Header;
