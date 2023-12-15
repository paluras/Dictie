

// This needs to be refactored'
// Have the speechRecognition be one thing
// DOM Manipulation another thing
interface HandleVoiceInputProps {
  setSpeechEnd: (value: boolean) => void;
  setSpokenText: (value: string) => void;
  speechEnd: boolean;
}

const handleVoiceInput = ({
  setSpeechEnd,
  setSpokenText,
  speechEnd,

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


  recognition.interimResults = true;
  recognition.lang = "ro-RO";
  recognition.continuous = false;

  recognition.onaudiostart = () => {
    setSpeechEnd(false);
    documentBody.style.backgroundColor = "#E5E581";
    startButton.style.backgroundColor = "#79d2c4";
    console.log("Audio started");
  };

  recognition.onaudioend = () => {
   
    documentBody.style.backgroundColor = "#fafaf0";
    startButton.style.backgroundColor = "#E5E580";
    setSpeechEnd(true);
    console.log("On Audio End Ran");
  }
 
  const stopBtn: HTMLElement = document.querySelector(".stop") as HTMLElement;
  stopBtn.onclick = () => {

    recognition.abort();
    console.log("Button Pressed and Speech Recognition Aborted");
  };

  // Main transcribe functionality
  recognition.onresult = (event: { results: { transcript: string }[][] }) => {
    const transcript: string = event.results[0][0].transcript;
    setSpokenText(transcript); // Added setSpokenText to update spokenText prop
  };

  console.log(speechEnd);

  // Error catcher
  recognition.onerror = (event: { error: string }) => {
    console.error("Speech recognition error", event.error);
    // scoreboard.style.color = "black";
  };

  recognition.start();
};

export default handleVoiceInput;
