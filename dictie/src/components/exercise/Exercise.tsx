import { useFetchQuestion } from "../../hooks/useFetchHooks.tsx";
import VoiceInput from "../../pages/VoiceInput.tsx";

function Exercise() {
  const questions = useFetchQuestion();

  return <VoiceInput questions={questions} />;
}

export default Exercise;
