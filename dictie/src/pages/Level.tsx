import React, { useEffect, useRef, useState } from "react";
import handleVoiceInput from "../utils/handleVoice.tsx";
// import levenshteinDistance from "./utils/levensheinDistance";
// import filterAlphabetic from "./utils/filterAlphabetic";
import addAnimation from "../utils/addAnimation";
// import HollowTriangle from "../components/animations/HollowTriangle.tsx";
import givenText from "../../db.tsx";
import "../style/style.animations.css";
import "../App.css";
// import CircleSVG from "../components/CircleSVG";
// import BlobOneLeft from "../components/animations/BlobSvg1.tsx";
// import BlobTwoLeft from "../components/animations/BlobSvg2.tsx";
// import BlobRight from "../components/animations/BlobSvg3.tsx";
// import Rectangle from "../components/animations/Rectangle.tsx";
import Header from "../components/Header.tsx";
import Animations from "../components/Animations.tsx";

const VoiceInput: React.FC = () => {
  const [spokenText, setSpokenText] = useState<string>("");
  const [animationKey, setAnimationKey] = useState<number>(0);

  const [speechEnd, setSpeechEnd] = useState<boolean>(true);

  const index = useRef<number>(0);
  const incrementCount = () => {
    index.current++;
    console.log(index.current); // Log the updated count
  };
  const [similarityPercentage, setSimilarityPercentage] = useState<number>(0);
  const [feeling, setFeeting] = useState<string>("");

  // const documentBody = document.body;
  // const startButton: HTMLButtonElement | null =
  //   document.querySelector(".start-btn")!;


  // Change this to context in future
  const resetAnimation = () => {
    // Incrementing the animationKey will re-render the component
    setAnimationKey((prevKey) => prevKey + 1);
  };
  // I dont know how to Fix type error of SpeechRecognition
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment

  // window.SpeechRecognition =
  //   window.SpeechRecognition || window.webkitSpeechRecognition;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const recognition = new (window as any).SpeechRecognition() || new (window as any).webkitSpeechRecognition();

  // const handleFront = async () => {
  //   // Your handleFront implementation here
  // };

  //  const handleVoiceInput = () => {
  //     recognition.interimResults = true;
  //     recognition.lang = "ro-RO";
  //     recognition.continuous = false;

  //     recognition.onaudiostart = () => {
  //       setSpeechEnd(false);
  //        // Make the background a color
  //       documentBody.style.backgroundColor = "#E5E581";
  //       startButton.style.backgroundColor = "#79d2c4";
  //       console.log("Audio started");
  //     };

  //     recognition.onspeechend = () => {
  //       recognition.stop();
  //       console.log("Speech recognition has stopped.");
  //     };

  //     // Change Background when audio ends
  //     recognition.onaudioend = () => {
  //       recognition.stop();
  //       console.log("audio has stoped");
  //       documentBody.style.backgroundColor = "#fafaf0";
  //       startButton.style.backgroundColor = "#E5E580";
  //       setSpeechEnd(true);
  //     };

  //     // Stop button
  //     const stopBtn: HTMLElement = document.querySelector(".stop") as HTMLElement;
  //     stopBtn.onclick = () => {
  //       recognition.abort();
  //       console.log("Speech recognition aborted.");
  //     };

  //     // Main transcribe functionality
  //     recognition.onresult = (event: { results: { transcript: string }[][] }) => {
  //       const transcript: string = event.results[0][0].transcript;
  //       setSpokenText(transcript);
  //       // Calculate Levenshtein distance and similarity percentage
  //       const distance = levenshteinDistance(
  //         filterAlphabetic(transcript.toLocaleLowerCase()),
  //         filterAlphabetic(givenText[index.current].toLocaleLowerCase())
  //       );
  //       const maxLength = Math.max(
  //         transcript.length,
  //         givenText[index.current].length
  //       );
  //       const similarity = Math.max(0, (1 - distance / maxLength) * 100);

  //       setSimilarityPercentage(similarity);

  // //initiate the next question
  //       if (speechEnd && similarity >= 95) {
  //         setTimeout(() => {
  //           handleFront();
  //           recognition.abort();
  //           console.log("recaborted");

  //         },500)
  //         recognition.abort();
  //         console.log("recaborted");
  //       }
  //     };

  //     console.log(speechEnd);

  // // Error catcher
  //     recognition.onerror = (event: { error: string }) => {
  //       console.error("Speech recognition error", event.error);
  //     };

  //     recognition.start();
  //   };

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
      {/* <div className="absolute-animations">
        {" "}
        <BlobTwoLeft animationKey={animationKey} />
        <BlobOneLeft animationKey={animationKey} />
        <BlobRight animationKey={animationKey} />
        <Rectangle animationKey={animationKey} />
        <HollowTriangle animationKey={animationKey} />
      </div> */}

      <Animations animationKey={animationKey} />
   <Header />
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
          <p className="similar-container">
            Similaritate: {similarityPercentage.toFixed(1)}% <br />
            {feeling}
          </p>
          {/* Make function to add the overall score somewhere and reset it */}
          <button
            className="front"
            onClick={() => (speechEnd ? handleFront() : "")}
          >
            Skip
          </button>
        </div>
        <div className="container-btns">
          {" "}
          <button
            style={{ display: speechEnd ? "flex" : "none" }}
            className="start-btn"
            onClick={() =>
              handleVoiceInput({
                setSpeechEnd,
                givenText: givenText[index.current],
                setSpokenText,
                setSimilarityPercentage,
                speechEnd,
                handleFront,
                spokenText: "",
              })
            }
          >
            Porniți Înregistrarea Vocală
          </button>
          <button
            style={{ display: speechEnd ? "none" : "flex" }}
            className="stop"
          >
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
