import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

interface ExerciseListPersonalProps {
  userId: string;
}

interface Exercise {
  id: string;
  title: string;
  arrayValue: string[];
}

const ExerciseListPersonal: React.FC<ExerciseListPersonalProps> = ({
  userId,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(
        collection(db, "personal-ex", userId, "exercises")
      );
      const fetchedExercises = querySnapshot.docs.map((doc) => doc.data());
      setExercises(fetchedExercises as Exercise[]);
    };

    fetchExercises();
  }, [userId]);

  return (
    <div>
      <h1>Exercitiile mele</h1>
      <ul >
        {exercises.map((exercise) => (
          <div key={exercise.id} className="element">
            <Link to={exercise.id}>
            <li  className={"list-item personal"}>
               {exercise.title}
            </li>
            </Link>
            <button
              onClick={() => {console.log("delete" ,exercise.id);
              }}
              type="button"
            >
              delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseListPersonal;
