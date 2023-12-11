
import levenshteinDistance from "./levensheinDistance";
import filterAlphabetic from "./filterAlphabetic";

interface HandleVoiceInputProps {
    setSpeechEnd: (value: boolean) => void;
    spokenText: string;
    givenText: string;
    setSpokenText: (value: string) => void; // Added setSpokenText to the props
    setSimilarityPercentage: (value: number) => void; // Added setSimilarityPercentage to the props
    handleFront: () => void;
    speechEnd: boolean;
}

const handleVoiceInput = ({ setSpeechEnd, givenText, setSpokenText, setSimilarityPercentage , speechEnd,handleFront }: HandleVoiceInputProps) => {
    const documentBody = document.body;
    const startButton: HTMLButtonElement | null =
        document.querySelector(".start-btn")!;
    // I dont know how to Fix type error of SpeechRecognition
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (window as any).SpeechRecognition() || new (window as any).webkitSpeechRecognition();

    recognition.interimResults = true;
    recognition.lang = "ro-RO";
    recognition.continuous = false;

    recognition.onaudiostart = () => {
        setSpeechEnd(false);
        // Make the background a color
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
        console.log("audio has stoped");
        documentBody.style.backgroundColor = "#fafaf0";
        startButton.style.backgroundColor = "#E5E580";
        setSpeechEnd(true);
    };

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

        // Calculate Levenshtein distance and similarity percentage
        const distance = levenshteinDistance(
            filterAlphabetic(transcript.toLocaleLowerCase()),
            filterAlphabetic(givenText.toLocaleLowerCase()) // Pass givenText as a prop
        );

        const maxLength = Math.max(
            transcript.length,
            givenText.length
        );
        const similarity = Math.max(0, (1 - distance / maxLength) * 100);
        setSimilarityPercentage(similarity); // Added setSimilarityPercentage to update similarityPercentage prop

        //initiate the next question
        if (speechEnd && similarity >= 95) {
            setTimeout(() => {
                handleFront();
                recognition.abort();
                console.log("recaborted");

            }, 500)
            recognition.abort();
            console.log("recaborted");
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