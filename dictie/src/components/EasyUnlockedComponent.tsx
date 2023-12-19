import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
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

  useEffect(() => {
    const fetchExercises = async () => {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(collection(firestore, dbArray));

      const exercisesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));

      setExercises(exercisesArray);

      // REFACTOR TU USE DB
      const storedLinks = localStorage.getItem("visitedLinks");
      if (storedLinks) {
        setVisitedLinks(JSON.parse(storedLinks));
      }
    };


    fetchExercises();
  }, [dbArray]);

  const handleClick = (user: string | undefined, id: string[]) => {
    if (!user) return;
    setUserArray(user, id);
  };

  // if (!visitedLinks.includes(path)) {
  //   const newVisitedLinks = [...visitedLinks, path];
  //   setVisitedLinks(newVisitedLinks);

  //   localStorage.setItem("visitedLinks", JSON.stringify(newVisitedLinks));
  // }
  return (
    <div>
      <h1>usor</h1>
      <ul>
        {exercises.map((link) => (
        
          
          <Link
            key={link.id}
            to={link.id}
            // Handle click to change to a function that
            // adds the id from the db to a user personal Array
            // And when we log in again , we filter the exercises and color them acordingly
            onClick={() => handleClick(user?.providerId, [link.id])}
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
