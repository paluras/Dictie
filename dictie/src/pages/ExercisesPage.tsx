import React from "react";
import Header from "../components/Header";
import "../style/style.exercise.css";
import { useState } from "react";

import EasyUnlockedComp from "../components/EasyUnlockedComponent";
import LvlsLockedComp from "../components/LvlsLockedComponent";
import GreuComp from "../components/GreuComponent";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ExercisesPage: React.FC = () => {
  // onAuthStateChanged(auth, (user) => {
  const user = useContext(AuthContext);
  const [level, setLevel] = useState<string>("Usor");
  console.log(level, "Level");


  return (
    <div>
      <Header backButton={undefined} />
      <div className="exercise-main">
        {/* LeftBar component */}
        <div className="left-bar">
          <ul>
            <li onClick={() => setLevel("Usor")}>Usor</li>
            <li onClick={() => setLevel("Mediu")}>Mediu</li>
            <li onClick={() => setLevel("Greu")}>Greu</li>
          </ul>
        </div>
        <div className="right-main">
          {level === "Usor" && <EasyUnlockedComp dbArray={"exercises-easy"} />}


          {user ? (
           level == "Mediu" && <LvlsLockedComp dbArray={"exercises-mid"} />
          ) : (
            level == "Mediu" && <h1>Log in to unlock</h1>
          )}
         
         
         
          {level === "Greu" && <GreuComp />}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
