import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import { CollectionContext } from "../context/CollectionContext"; // replace with your actual context
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
    const fetchQuestions = async () => {
      const firestore = getFirestore();
      const docRef = doc(collection(firestore, document), level);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQuestions(docSnap.data().arrayValue);
      } else {
        console.log("No such document!");
      }
    };

    fetchQuestions();
  }, [level, document]);

  return questions;
};
