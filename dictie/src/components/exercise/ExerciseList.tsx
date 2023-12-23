import { Link } from "react-router-dom";
import { setFirebaseUserArray } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import {
  CollectionContext,
  CollectionContextType,
} from "../../context/CollectionContext";
import "../../style/style.exercise.css";
import { useFetchExercises, ExerciseList } from "../../hooks/useFetchExercises";
import { useFetchVisited } from "../../hooks/useFetchVisited";
import { useState, useEffect } from "react";

const ExercisesList: React.FC<{ title: string }> = ({ title }) => {
  const user = useContext(AuthContext);
  const { document } = useContext<CollectionContextType>(CollectionContext);
  const [exercises, setExercises] = useState<ExerciseList[]>([]);
  const fetchedExercises = useFetchExercises();
  const visitedLinks = useFetchVisited();

  useEffect(() => {
    const localStorageExercises = localStorage.getItem(document);

    if (localStorageExercises) {
      setExercises(JSON.parse(localStorageExercises));
    } else if (fetchedExercises.length > 0) {
      setExercises(fetchedExercises);
      localStorage.setItem(document, JSON.stringify(fetchedExercises));
    }
  }, [fetchedExercises , document]);

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
