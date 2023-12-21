import React from "react";
import Header from "../components/Header";
import "../style/style.exercise.css";
import ExerciseList from "../components/exercise/ExerciseList";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CollectionContext } from "../context/CollectionContext";

type CollectionContextType = {
  document: string;
  setDocument: (doc: string) => void;
};
const ExercisesPage: React.FC = () => {
  const user = useContext(AuthContext);
  const { document, setDocument } = useContext<CollectionContextType>(
    CollectionContext as unknown as React.Context<CollectionContextType>
  );

  return (
    <div>
      <Header backButton={undefined} />
      <div className="exercise-main">
        {/* LeftBar component */}
        <div className="left-bar">
          <ul>
            <li onClick={() => setDocument("exercises-easy")}>Usor</li>
            <li onClick={() => setDocument("exercises-mid")}>Mediu</li>
            <li onClick={() => setDocument("exercises-hard")}>Greu</li>
          </ul>
        </div>
        <div className="right-main">
          {document === "exercises-easy" && <ExerciseList title="Usor" />}

          {user
            ? document == "exercises-mid" && <ExerciseList title="Mediu" />
            : document == "exercises-mid" && <h1>Log in to unlock</h1>}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
