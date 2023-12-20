import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection } from "firebase/firestore";
import { getDocs, getDoc, doc } from "firebase/firestore";
import { setUserArray } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import { CollectionContext } from "../context/CollectionContext";
import { useContext } from "react";
import "../style/style.exercise.css";

interface ExerciseList {
  id: string;
  text: string;
}

type CollectionContextType = {
  document: string;
  setDocument: (doc: string) => void;
};
const ExercisesList: React.FC<{ title: string }> = ({ title }) => {
  const [visitedLinks, setVisitedLinks] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseList[]>([]);
  const user = useContext(AuthContext);
  const { document } = useContext<CollectionContextType>(
    CollectionContext as unknown as React.Context<CollectionContextType>
  );

  // Code split this
  useEffect(() => {
    const fetchExercises = async () => {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(collection(firestore, document));

      const exercisesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));

      setExercises(exercisesArray);
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        console.log(userDoc.data());

        if (userDoc.exists()) {
          setVisitedLinks(userDoc.data().idExercise || []);
        }
      }
    };
    fetchExercises();
  }, [user, document]);

  const handleClick = (user: string | undefined, id: string[]) => {
    if (!user) return;
    setUserArray(user, id);
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
