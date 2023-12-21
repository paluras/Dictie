import { useEffect, useState } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { getDocs} from "firebase/firestore";
import { useContext } from "react";
import { CollectionContext } from "../context/CollectionContext";

interface ExerciseList {
  id: string;
  text: string;
}
type CollectionContextType = {
  document: string;
  setDocument: (doc: string) => void;
};
export const useFetchExercises = () => {
  const [exercises, setExercises] = useState<ExerciseList[]>([]);
  const { document } = useContext<CollectionContextType>(
    CollectionContext as unknown as React.Context<CollectionContextType>
  );

  useEffect(() => {
    const fetchExercises = async () => {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(collection(firestore, document));

      const exercisesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));
      setExercises(exercisesArray);
    };
    fetchExercises();
  }, [document]);

  return exercises;
};
