import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const LandingPage: React.FC = () => {
  return (
    <>
      <Header  />
      <main>
        <h1></h1>
        <h2>O noua metodă de perfecționare a dicției.</h2>
        <p></p>
        <Link to="/easy">Usor</Link>
      </main>
    </>
  );
};

export default LandingPage;
