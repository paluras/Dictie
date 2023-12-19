import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import "../style/style.exercise.css";

interface Exercise {
  id: string;
  text: string;
}

const LvlsLockedComp: React.FC<{ dbArray: string }> = ({ dbArray }) => {
  // const [visitedLinks, setVisitedLinks] = useState<string[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // useEffect(() => {
  //   const storedLinks = localStorage.getItem("visitedLinks");
  //   if (storedLinks) {
  //     setVisitedLinks(JSON.parse(storedLinks));
  //   }
  // }, []);

  // console.log(visitedLinks, "visitedLinks");

  // const handleClick = (path: string) => {
  //   if (!visitedLinks.includes(path)) {
  //     const newVisitedLinks = [...visitedLinks, path];
  //     setVisitedLinks(newVisitedLinks);
  //     localStorage.setItem("visitedLinks", JSON.stringify(newVisitedLinks));
  //   }
  // };

  useEffect(() => {
    const fetchExercises = async () => {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(collection(firestore, dbArray));

      const exercisesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));
     

      setExercises(exercisesArray);
    };

    fetchExercises();
  }, [dbArray]);

  return (
    <div>
      <h1>mediu</h1>
      <ul>
        {exercises.map((link) => (
          <Link
            key={link.id}
            to={link.id}
            // Handle click to change to a function that 
            // adds the id from the db to a user personal Array
            // And when we log in again , we filter the exercises and color them acordingly
            // onClick={() => handleClick(link.id)}
          >
            <li
              // className={
              //   visitedLinks.includes(link.id) ? "visited" : "list-item"
              // }
            >
              {link.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LvlsLockedComp;
