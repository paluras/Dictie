import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import CreateExerciseBtn from "../CreateExerciseBtn";

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

  const fetchExercises = async () => {
    const db = getFirestore();
    const querySnapshot = await getDocs(
      collection(db, "personal-ex", userId, "exercises")
    );
    const fetchedExercises = querySnapshot.docs.map((doc) => doc.data());
    setExercises(fetchedExercises as Exercise[]);
  };

  useEffect(() => {
    fetchExercises();
  }, [userId, exercises]);

  const db = getFirestore();

  return (
    <div>
      <h1>Exercitiile mele</h1>
      <CreateExerciseBtn />
      <ul>
        {exercises.map((exercise) => (
          <div key={exercise.id} className="element">
            <Link to={exercise.id}>
              <li className={"list-item personal"}>{exercise.title}</li>
            </Link>
            <button
              type="button"
              onClick={async () => {
                console.log("delete", exercise.id);
                await deleteDoc(
                  doc(db, "personal-ex", userId, "exercises", exercise.id)
                );
                fetchExercises();
              }}
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
