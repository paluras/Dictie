import React, { useEffect, useRef, useState } from "react";
import levenshteinDistance from "./utils/levensheinDistance";
import filterAlphabetic from "./utils/filterAlphabetic";
import addAnimation from "./utils/addAnimation";
import HollowTriangle from "./components/HollowTriangle";
import "./style/style.animations.css"
import "./App.css";
import CircleSVG from "./components/CircleSVG";
import BlobOneLeft from "./components/BlobSvg1";
import BlobTwoLeft from "./components/BlobSvg2";
import BlobRight from "./components/BlobSvg3";
import Rectangle from "./components/Rectangle";

const VoiceInput: React.FC = () => {
  const [spokenText, setSpokenText] = useState<string>("");
  const [animationKey, setAnimationKey] = useState<number>(0);

  const [speechEnd, setSpeechEnd] = useState<boolean>(true);

  const index = useRef<number>(0);
  const incrementCount = () => {
    index.current ++;
    console.log(index.current); // Log the updated count
  };
const [similarityPercentage, setSimilarityPercentage] = useState<number>(0);
const [feeling, setFeeting] = useState<string>("");

  const documentBody = document.body;
  const startButton: HTMLButtonElement | null =
    document.querySelector(".start-btn")!;

  const givenText = [
    "șase sași în șase saci",
    "O babă bălană mănâncă o banană babană.",
    "Stânca stă-n castan ca saşa Stan",
    "Cupă cu capac, capac cu cupă.",
    "Pe cap un capac, pe capac un ac.",
    "Noi nu ne nimeriserăm minunăţiile lănţişoarelor remunerate",
    "Clopotarul clătina clopotul clopotniței.",
    "Retevei de tei pe mirişte de mei.",
    "Zecele de pică mare are masa la picioare.",
    "Domnule dudar, dă-mi două dude dulci din dudul dumitale de dincolo de Dunăre!",
    "O barză brează face zarvă pe-o varză",
    "Nașpa, nasol stau în nămol ca un actor jucând un rol!",
    "Capra calca-n piatra,Piatra crapa-n patru; Crăpa-i-ar capul caprei, Precum a crapat piatra-n patru.",
    "Un vultur stă pe-un pisc c-un pix în plisc",
    "Prin Vulturi vântul viu vuia",
    "Leul lăudat lipește abțibilduri lucioase.",
    "Sasha şuşotea șosetelor însuşiri şiruitoare.",
    "Bucur și Bucura se bucură că Bucurel e bucuros în București.",
    "Am o prepeliţă pestriţă cu paisprezece pui de prepeliţă pestriţi. E mai pestriţă prepeliţa pestriţă decât cei paisprezece pui de prepeliţă pestriţi.",
    "O coropișniță și-un coropișnițoi se coropișniteau la noi pe gunoi. Nu coropișnița coropișnițea pe coropișnițoi, ci coropișnițoiul coropișnițea pe coropișniță.",
  ]; // Set your desired text here

  const resetAnimation = () => {
    // Incrementing the animationKey will re-render the component
    setAnimationKey((prevKey) => prevKey + 1);
  };
  // I dont know how to Fix type error of SpeechRecognition
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognition = new (window as any).SpeechRecognition() || new (window as any).webkitSpeechRecognition();

  const handleVoiceInput = () => {
    recognition.interimResults = true;
    recognition.lang = "ro-RO";
    recognition.continuous = false;

    recognition.onaudiostart = () => {
      setSpeechEnd(false);
     
      documentBody.style.backgroundColor = "#E5E581";
      startButton.style.backgroundColor = "#79d2c4";

      // Make the background a color
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
      setSpokenText(transcript);
      // Calculate Levenshtein distance and similarity percentage
      const distance = levenshteinDistance(
        filterAlphabetic(transcript.toLocaleLowerCase()),
        filterAlphabetic(givenText[index.current].toLocaleLowerCase())
      );
      const maxLength = Math.max(
        transcript.length,
        givenText[index.current].length
      );
      const similarity = Math.max(0, (1 - distance / maxLength) * 100);

      setSimilarityPercentage(similarity);


      if (speechEnd && similarity >= 95) {
        setTimeout(() => {
          handleFront();
          recognition.abort();
          console.log("recaborted");
          
        },1000)
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


  const handleBack = () => {
    addAnimation();
    setSpokenText("");
    resetAnimation();
    index.current--;
  };

  const handleFront = async () => {
  
    await addAnimation();
    resetAnimation();
    incrementCount();
      setSpokenText("");
     
      setSimilarityPercentage(0);
  
  };


  // Change text based on similarityPercentage
  useEffect(() => {
    similarityPercentage < 5
      ? setFeeting("😊 Sa incepem")
      : similarityPercentage <= 50
      ? setFeeting("😔 Poți face mai bine")
      : similarityPercentage > 50 && similarityPercentage < 80
      ? setFeeting("😯 Te apropii!")
      : similarityPercentage > 80 && similarityPercentage < 90
      ? setFeeting("😃 Lucru excelent!")
      : similarityPercentage > 90
      ? setFeeting("😍 Ai făcut uimitor!")
      : setFeeting("");
  }, [similarityPercentage]);




  return (
    <>
        {/* make components for each  */}
       <div className="absolute-animations">
          {" "}
          <BlobTwoLeft animationKey={animationKey} />
          <BlobOneLeft animationKey={animationKey} />
          <BlobRight animationKey={animationKey} />
          <Rectangle animationKey={animationKey} />
          <HollowTriangle animationKey={animationKey} />
         
        </div>
      <header>
        <h1 className="logo" style={{ position: "absolute",left:"10px", top: "5px", margin: "0" }}>
          Dictie!
        </h1>
        <CircleSVG animationKey={animationKey} />
      </header>
      <main>
    
      

        <div className="container-given-text">
          <h1 key={animationKey} className="animated-text">
            {givenText[index.current]}
          </h1>
        </div>
        <div className="container-mid">
          <button className="back" onClick={() => handleBack()}>
            Back
          </button>
          <p>
            Procent de Similaritate: {similarityPercentage.toFixed(1)}% <br />
            {feeling}
          </p>
          {/* Make function to add the overall score somewhere and reset it */}
          <button className="front" onClick={() => handleFront()}>
            Next
          </button>
        </div>

        <div className="container-btns">
          {" "}
          <button
            style={{ display: speechEnd ? "flex" : "none"}}
            className="start-btn"
            onClick={handleVoiceInput}
          >
            Porniți Înregistrarea Vocală
          </button>
          <button style={{ display: speechEnd ? "none" : "flex"}} className="stop">
            Stop
          </button>
        </div>
        {spokenText && (
          <div className="spoken-text">
            <h2 className="h2-title"> Dictie-metrul a inteles:</h2>

            <h3 className="spoken">{spokenText}</h3>
          </div>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default VoiceInput;
