import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection } from "firebase/firestore";
import { getDocs , getDoc , doc } from "firebase/firestore";
import { setUserArray } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import "../style/style.exercise.css";

interface Exercise {
  id: string;
  text: string;
}

const EasyUnlockedComp: React.FC<{ dbArray: string }> = ({ dbArray }) => {
  const [visitedLinks, setVisitedLinks] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const user = useContext(AuthContext);
 
  
// Code split this
  useEffect(() => {
    const fetchExercises = async () => {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(collection(firestore, dbArray));

      const exercisesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
    
      }));

      setExercises(exercisesArray);
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        console.log(userDoc.data());
        
        if (userDoc.exists()) {
          setVisitedLinks(userDoc.data().idExercise || []);
        }
      }
    };
    fetchExercises();
  }, [dbArray, user]);


  const handleClick = (user: string | undefined, id: string[]) => {
    if (!user) return;
    setUserArray(user, id);
  };

  return (
    <div>
      <h1>usor</h1>
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

export default EasyUnlockedComp;
