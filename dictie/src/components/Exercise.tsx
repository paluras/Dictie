import { useParams } from "react-router-dom";
// import { givenText } from "../../db.tsx";
import { getFirestore, collection } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import VoiceInput from "../pages/VoiceInput.tsx";

function Exercise() {
  const { level } = useParams();
  const [questions, setQuestions] = useState(["Loading..."]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const firestore = getFirestore();
      // Make "exercises-easy" a variable and pass it as a prop 
      const docRef = doc(collection(firestore, "exercises-easy"), level);
      console.log(docRef, "docRef");

      const docSnap = await getDoc(docRef);
      console.log(docSnap, "docSnap");

      if (docSnap.exists()) {
        setQuestions(docSnap.data().arrayValue);
      } else {
        console.log("No such document!");
      }
    };

    fetchQuestions();
  }, [level]);




  return <VoiceInput questions={questions} />;
}

export default Exercise;
