import { useEffect, useState } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useContext } from "react";
import {
  CollectionContext,
  CollectionContextType,
} from "../context/CollectionContext";

export interface ExerciseList {
  id: string;
  text: string;
}

export const useFetchExercises = () => {
  const [exercises, setExercises] = useState<ExerciseList[]>([]);
  const { document } = useContext<CollectionContextType>(
    CollectionContext as unknown as React.Context<CollectionContextType>
  );

  useEffect(() => {
    const localStorageExercises = localStorage.getItem(document);
    const fetchExercises = async () => {
      if (localStorageExercises) {
        const parsed = JSON.parse(localStorageExercises);
        const exercisesArrayLocal = parsed.map(
          (doc: { text: string; id: number; arrayValue: string[] }) => ({
            id: doc.id,
            text: doc.text,
            arrayValue: doc.arrayValue,
          })
        );

        setExercises(exercisesArrayLocal);
      } else if (!localStorageExercises) {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, document));
        console.log(querySnapshot);

        const exercisesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          arrayValue: doc.data().arrayValue,
        }));
        setExercises(exercisesArray);
      }
    };
    fetchExercises();
  }, [document]);

  return exercises;
};
