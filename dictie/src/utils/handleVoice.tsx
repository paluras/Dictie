import levenshteinDistance from "./levensheinDistance";
import filterAlphabetic from "./filterAlphabetic";
// This needs to be refactored'
// Have the speechRecognition be one thing
// DOM Manipulation another thing
interface HandleVoiceInputProps {
  setSpeechEnd: (value: boolean) => void;
  spokenText: string;
  givenText: string;
  setSpokenText: (value: string) => void;
  setSimilarityPercentage: (value: number) => void;
  handleFront: () => void;
  speechEnd: boolean;
  setUserScore: (value: number) => void; // Add missing property
}

const handleVoiceInput = ({
  setSpeechEnd,
  givenText,
  setSpokenText,
  setSimilarityPercentage,
  speechEnd,
  handleFront,
  setUserScore,
}: HandleVoiceInputProps) => {
  const documentBody = document.body;
  const startButton: HTMLButtonElement | null =
    document.querySelector(".start-btn")!;
  // I dont know how to Fix type error of SpeechRecognition
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognition =new (window as any).SpeechRecognition() || new (window as any).webkitSpeechRecognition();
  let score = 0;

  recognition.interimResults = true;
  recognition.lang = "ro-RO";
  recognition.continuous = false;

  console.log(recognition);
  
  recognition.onaudiostart = () => {
    setSpeechEnd(false);
    // Make the background a color
    // refactor this
    documentBody.style.backgroundColor = "#E5E581";
    startButton.style.backgroundColor = "#79d2c4";
    console.log("Audio started");
  };
  recognition.onspeechend = () => {
    recognition.stop();
    console.log("Speech recognition has stopped.");
};

 

  // Change Background when audio ends
recognition.onaudioend = () => {
   
    
    recognition.stop();
    recognition.abort();
    console.log("audio has stoped");
    documentBody.style.backgroundColor = "#fafaf0";
    startButton.style.backgroundColor = "#E5E580";
    setSpeechEnd(true);

    // console.log(userScore, "userScore");

    console.log(speechEnd), "speechEnd";
    console.log(score, "score");
    setTimeout(() => {
    if (speechEnd && score >= 90) {
   
  
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setUserScore((prev: number) => prev + 1);
      handleFront();
    
    //   console.log("Plus One");

    //   recognition.abort();
    //   console.log("recaborted");

    
    } else if (speechEnd && score >= 10 && score < 90) {
      handleFront();
      console.log("Nothing");
    }recognition.abort();
}, 1000)
  };
//   recognition.onspeechend = () => {
//     recognition.stop();
//     console.log("Speech recognition has stopped.");
//   };

  // Stop button
  const stopBtn: HTMLElement = document.querySelector(".stop") as HTMLElement;
  stopBtn.onclick = () => {
    recognition.abort();
    console.log("Speech recognition aborted.");
  };

  // Main transcribe functionality
  recognition.onresult = (event: { results: { transcript: string }[][] }) => {
    const transcript: string = event.results[0][0].transcript;
    setSpokenText(transcript); // Added setSpokenText to update spokenText prop
    console.log(transcript);

    // Calculate Levenshtein distance and similarity percentage
    const distance = levenshteinDistance(
      filterAlphabetic(transcript.toLocaleLowerCase()),
      filterAlphabetic(givenText.toLocaleLowerCase()) // Pass givenText as a prop
    );

    const maxLength = Math.max(transcript.length, givenText.length);
    const similarity = Math.max(0, (1 - distance / maxLength) * 100);
    score = Math.round(similarity);
    console.log(score, "score");

    setSimilarityPercentage(similarity); // Added setSimilarityPercentage to update similarityPercentage prop
  };

  console.log(speechEnd);

  // Error catcher
  recognition.onerror = (event: { error: string }) => {
    console.error("Speech recognition error", event.error);
  };

  recognition.start();
};

export default handleVoiceInput;
