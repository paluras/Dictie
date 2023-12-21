import { useState, useEffect,useContext } from "react";
import { getFirestore } from "firebase/firestore";
import { AuthContext } from "./../context/AuthContext";
import { getDoc, doc } from "firebase/firestore";

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
