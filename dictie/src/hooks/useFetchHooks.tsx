import { useEffect, useState, useContext } from "react";
import { getFirestore, doc, collection, getDoc , getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { CollectionContext , CollectionContextType} from "../context/CollectionContext"; 
import { AuthContext } from "../context/AuthContext";


export interface ExerciseList {
    id: string;
    text: string;
  }

export const useFetchCreated = (userId: string) => {
  const [exercises, setExercises] = useState<ExerciseList[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'personal-ex', userId, 'exercises'));
      const fetchedExercises = querySnapshot.docs.map(doc => doc.data() as ExerciseList);
      setExercises(fetchedExercises);
    };

    fetchExercises();
  }, [userId]);

  return exercises;
};
export const useFetchQuestion = () => {
    const { level } = useParams();
    const { document } = useContext<CollectionContextType>(
      CollectionContext as unknown as React.Context<CollectionContextType>
    );
    const [questions, setQuestions] = useState(["Loading..."]);
    const user = useContext(AuthContext);
    useEffect(() => {
      const localStorageExercises = localStorage.getItem(document);
  
      const fetchQuestions = async () => {
        if (localStorageExercises) {
          const parsed = JSON.parse(localStorageExercises);
          console.log(parsed, "Fetched questions");
          const currentQuestion = parsed.find(
            (exercise: { id: string }) => exercise.id === level
          );
          setQuestions(currentQuestion.arrayValue);
        
        } else if (!localStorageExercises) {
          const firestore = getFirestore();
          let docSnap;
  
          // Try to fetch from the 'personal-ex' collection.
          if (!user) return;
          let docRef = doc(collection(firestore, 'personal-ex', user.uid, 'exercises'), level);
          docSnap = await getDoc(docRef);
  
          if (!docSnap.exists()) {
            // If not found, try to fetch from the 'exercises-mid' collection.
            docRef = doc(collection(firestore, 'exercises-mid'), 'mid0');
            docSnap = await getDoc(docRef);
          }
  
          if (docSnap.exists()) {
            setQuestions(docSnap.data().arrayValue);
          } else {
            console.log("No such document!");
          }
        }
      };
  
      fetchQuestions();
    }, [level, document, user]);
  
    return questions;
  };
  export const useFetchExercisesList = () => {
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
  export const useFetchVisited = () => {
    const user = useContext(AuthContext);
    const [visitedLinks, setVisitedLinks] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchVisited = async () => {
        const firestore = getFirestore();
  
        if (user) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            setVisitedLinks(userDoc.data().idExercise || []);
          }
        }
      };
      fetchVisited();
    }, [user]);
    return visitedLinks;
  };
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