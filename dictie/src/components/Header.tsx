import React, { ReactNode } from "react";

// import CircleSVG from "./animations/CircleSVG";

type HeaderProps = {
  backButton: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ backButton }) => {

  return (
    <header>
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
      {/* <CircleSVG animationKey={animationKey} /> */}
      <div className="right-header">
     {backButton}
      </div>
   
    </header>
  );
};

export default Header;
