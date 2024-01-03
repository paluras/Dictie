import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import { CollectionContext } from "../context/CollectionContext"; 
type CollectionContextType = {
  document: string;
  setDocument: (doc: string) => void;
};

export const useFetchQuestion = () => {
  const { level } = useParams();
  const { document } = useContext<CollectionContextType>(
    CollectionContext as unknown as React.Context<CollectionContextType>
  );
  const [questions, setQuestions] = useState(["Loading..."]);

  useEffect(() => {
    const localStorageExercises = localStorage.getItem(document);

    const fetchQuestions = async () => {
      if (localStorageExercises) {
        const parsed = JSON.parse(localStorageExercises);
        console.log(parsed, "Ferched questions");
        const currentQuestion = parsed.find(
          (exercise: { id: string }) => exercise.id === level
        );
        setQuestions(currentQuestion.arrayValue);
      
      } else if (!localStorageExercises) {
        const firestore = getFirestore();
        const docRef = doc(collection(firestore, document), level);
        console.log(docRef);

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuestions(docSnap.data().arrayValue);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchQuestions();
  }, [level, document]);

  return questions;
};
