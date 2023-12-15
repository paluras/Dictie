import { useParams } from "react-router-dom";
import { givenText, givenText2, givenText3, givenText4 } from "../../db.tsx";
import VoiceInput from "../pages/Level.tsx";


function Exercise() {
    const { level } = useParams();
    let questions: string[] = [];
  
    switch(level) {
      case 'easy':
        questions = givenText;
        break;
      case 'easy-two':
        questions = givenText2;
        break;
      case 'easy-three':
        questions = givenText3;
        break;
      case 'easy-four':
        questions = givenText4;
        break;
      default:
        questions = []; // default questions or error handling
    }
  
    return <VoiceInput questions={questions} />;
  }

  export default Exercise;