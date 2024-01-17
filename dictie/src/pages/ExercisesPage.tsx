
import Header from "../components/Header";
import ExerciseList from "../components/exercise/ExerciseList";
import { useContext  } from "react";
import { AuthContext } from "../context/AuthContext";
import { CollectionContext, CollectionContextType } from "../context/CollectionContext";
import ExerciseListPersonal from "../components/exercise/ExerciseListPersonal";

const ExercisesPage: React.FC = () => {
  const user = useContext(AuthContext);
  const { document, setDocument } = useContext<CollectionContextType>(
    CollectionContext as unknown as React.Context<CollectionContextType>
  );

  return (
    <div>
      <Header backButton={undefined} logInBtn={true}  />
      <div className="exercise-main">
        {/* LeftBar component */}
        <div className="left-bar">
          <ul>
            <li onClick={() => setDocument("exercises-easy")}>Usor</li>
            <li onClick={() => setDocument("exercises-mid")}>Mediu</li>
            <li onClick={() => setDocument("personal-ex")}>Personal</li>
          </ul>
        </div>
        <div className="right-main">
          {document === "exercises-easy" && <ExerciseList title="Usor" />}

          {user
            ? document == "exercises-mid" && <ExerciseList title="Mediu" />
            : document == "exercises-mid" && <h1>Log in to unlock</h1>}
          {user
            ? document == "personal-ex" && <ExerciseListPersonal userId = {user.uid} />
            : document == "personal-ex" && <h1>Log in to Create personal exercises</h1>}
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
