import React from "react";
// import CircleSVG from "./animations/CircleSVG";

const Header: React.FC = () => {
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
        Dictie!
      </h1>
      {/* <CircleSVG animationKey={animationKey} /> */}
      <div className="right-header">
        <h2>Exercitii</h2>
        <h2>Progress</h2>
      </div>
    </header>
  );
};

export default Header;
