import { useParams } from "react-router-dom";
import { givenText } from "../../db.tsx";
import VoiceInput from "../pages/Level.tsx";


function Exercise() {
    const { level } = useParams();
    let questions: string[] = [];
// DRY    Remake this please
    switch(level) {
      case 'easy':
        questions = givenText.easy.arrayValue;
        break;
      case 'easy-one':
        questions = givenText.easyOne.arrayValue;
        break;
      case 'easy-two':
        questions = givenText.easyTwo.arrayValue;
        break;
      case 'easy-three':
        questions = givenText.easyThree.arrayValue;
        break;
        case 'easy-four':
        questions = givenText.easyFour.arrayValue;
        break;
        case 'easy-five':
          questions = givenText.easyFive.arrayValue;
          break;
        case 'easy-six':
          questions = givenText.easySix.arrayValue;
          break;
        case 'easy-seven':
          questions = givenText.easySeven.arrayValue;
          break;
        case 'easy-eight':
          questions = givenText.easyEight.arrayValue;
          break;
          case 'easy-nine':
          questions = givenText.easyNine.arrayValue;
          break;
      default:
        questions = []; // default questions or error handling
    }
  
    return <VoiceInput questions={questions} />;
  }

  export default Exercise;