import { Link } from "react-router-dom";
import { setFirebaseUserArray } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "../../style/style.exercise.css";
import { useFetchExercises } from "../../hooks/useFetchExercises";
import { useFetchVisited } from "../../hooks/useFetchVisited";

const ExercisesList: React.FC<{ title: string }> = ({ title }) => {
  const user = useContext(AuthContext);
  const exercises = useFetchExercises();
  const visitedLinks = useFetchVisited();

  // Worth making a component?
  const handleClick = (user: string | undefined, id: string[]) => {
    if (!user) return;
    setFirebaseUserArray(user, id);
  };

  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {exercises.map((link) => (
          <Link
            key={link.id}
            to={link.id}
            onClick={() => handleClick(user?.uid, [link.id])}
          >
            <li
              className={
                visitedLinks.includes(link.id) ? "visited" : "list-item"
              }
            >
              {link.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ExercisesList;
