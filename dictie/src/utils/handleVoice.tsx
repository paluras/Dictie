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
  window.SpeechRecognition =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognition = new (window as any).SpeechRecognition() ||new (window as any).webkitSpeechRecognition();
  let score = 0;

  recognition.interimResults = true;
  recognition.lang = "ro-RO";
  recognition.continuous = false;

  console.log(recognition);

  recognition.onaudiostart = () => {
    setSpeechEnd(false);
    documentBody.style.backgroundColor = "#E5E581";
    startButton.style.backgroundColor = "#79d2c4";
    console.log(score,"Audio started");
  };


  recognition.onspeechend = () => {
    recognition.stop();
      setSpeechEnd(true);
    console.log(score,"On Speech End Ran");
  };


  recognition.onaudioend = () => {
    recognition.stop();
    documentBody.style.backgroundColor = "#fafaf0";
    startButton.style.backgroundColor = "#E5E580";
    setSpeechEnd(true);
    console.log(score,"On Audio End Ran");

    
    setTimeout(() => {
    if (speechEnd && score >= 10 && score < 90) {
        handleFront();
        console.log(score,"speechEnd && score >= 10 && score < 90 Ran");
    }
    recognition.abort();
  }, 1000);
  };
  // Stop button
  const stopBtn: HTMLElement = document.querySelector(".stop") as HTMLElement;
  stopBtn.onclick = () => {
    recognition.abort();
    console.log("Button Pressed and Speech Recognition Aborted");
  };

  // Main transcribe functionality
  recognition.onresult = (event: { results: { transcript: string }[][] }) => {
    const transcript: string = event.results[0][0].transcript;
    setSpokenText(transcript); // Added setSpokenText to update spokenText prop
 

    // Calculate Levenshtein distance and similarity percentage
    const distance = levenshteinDistance(
      filterAlphabetic(transcript.toLocaleLowerCase()),
      filterAlphabetic(givenText.toLocaleLowerCase()) // Pass givenText as a prop
    );
      
    const maxLength = Math.max(transcript.length, givenText.length);
    const similarity = Math.max(0, (1 - distance / maxLength) * 100);
    score = Math.round(similarity);
   

    setSimilarityPercentage(similarity); // Added setSimilarityPercentage to update similarityPercentage prop
    
    if (speechEnd && score >= 90) {
     
        console.log(score,"speechEnd && score >= 90 Ran");
        
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setUserScore((prev: number) => prev + 1);
        console.log(score,"Score updated")
    setTimeout(()=>{
      handleFront();
    },1000)    
      
     
      recognition.stop();

    }else if(recognition.onspeechend && score < 10){
      console.log(score,"Speech ended");
      recognition.stop();
    }

   
 
 

    
  };

  console.log(speechEnd);

  // Error catcher
  recognition.onerror = (event: { error: string }) => {
    console.error("Speech recognition error", event.error);
  };

  recognition.start();
};

export default handleVoiceInput;
