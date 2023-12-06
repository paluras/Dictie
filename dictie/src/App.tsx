import React, { useEffect, useState } from "react";
import levenshteinDistance from "./utils/levensheinDistance";
import filterAlphabetic from "./utils/filterAlphabetic";
import HollowTriangle from "./components/HollowTriangle";
import "./App.css";
import CircleSVG from "./components/CircleSVG";









const VoiceInput: React.FC = () => {
  const [spokenText, setSpokenText] = useState<string>("");
  const givenText = [
    "șase sași în șase saci",
    "Noi nu ne nimeriserăm minunăţiile lănţişoarelor remunerate",
    "Clopotarul clătina clopotul clopotniței.",
    "Ora nouă, nouă ouă, găinușa ouă după ora nouă.",
    "Zecele de pică mare are masa la picioare.",
    "Domnule dudar, dă-mi două dude dulci din dudul dumitale de dincolo de Dunăre!",
    "O barză brează face zarvă pe-o varză",
    "Nașpa, nasol stau în nămol ca un actor jucând un rol!",
    "Capra calca-n piatra,Piatra crapa-n patru; Crăpa-i-ar capul caprei, Precum a crapat piatra-n patru.",
    "Un vultur stă pe-un pisc c-un pix în plisc",
    "Leul lăudat lipește abțibilduri lucioase.",
    "Sașa şuşotea șosetelor însuşiri şiruitoare.",
    "Bucur și Bucura se bucură că Bucurel e bucuros în București.",
    "Am o prepeliţă pestriţă cu paisprezece pui de prepeliţă pestriţi. E mai pestriţă prepeliţa pestriţă decât cei paisprezece pui de prepeliţă pestriţi.",
    "O coropișniță și-un coropișnițoi se coropișniteau la noi pe gunoi. Nu coropișnița coropișnițea pe coropișnițoi, ci coropișnițoiul coropișnițea pe coropișniță.",
  ]; // Set your desired text here
  const [animationKey, setAnimationKey] = useState(0);

  const resetAnimation = () => {
    // Incrementing the animationKey will re-render the component
    setAnimationKey((prevKey) => prevKey + 1);
  };
  const [index, setIndex] = useState<number>(0);

  const [similarityPercentage, setSimilarityPercentage] = useState<number>(0);
  const [feeling, setFeeting] = useState<string>(" ");

  const documentBody = document.body;
  const startButton: HTMLButtonElement | null =
    document.querySelector(".start-btn")!;




    // I dont know how to Fix type error of SpeechRecognition
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   //@ts-expect-error
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognition = new (window as any).SpeechRecognition() || new (window as any).webkitSpeechRecognition()  ;


  const handleVoiceInput = () => {
    recognition.interimResults = true;
    recognition.lang = "ro-RO";
    recognition.continuous = false

    recognition.onaudiostart = () => {
      documentBody.style.backgroundColor = "#E5E581";
      startButton.style.backgroundColor = "#79d2c4";

      // Make the background a color
      console.log("Audio started");
    };
    // recognition.onspeechend = () => {
    //   console.log("lame");
      
    // }

    recognition.onspeechend = () => {
      recognition.stop();
      console.log("Speech recognition has stopped.");
    };
    recognition.onaudioend = () => {
      // const animatedText: HTMLElement =
      //   document.querySelector(".animated-text")!;
      // console.log(animatedText);
      // const speech: HTMLElement = document.querySelector(".spoken-text")!;
      // console.log(animatedText);

      documentBody.style.backgroundColor = "#fafaf0";
      startButton.style.backgroundColor = "#E5E580";
      // Change background to default


      //     console.log("Audio ended");
      //     if (similarityPercentage > 90) {
      //     setTimeout(() => {
      //       console.log(similarityPercentage);

      //       console.log("2sec");
      //       animatedText.classList.add("slide-in");
      //       speech.classList.add("slide-in");

      //       setTimeout(() => {
      //         handleFront();
      //         console.log("front");

      //       }, 1000);
      // }, 1000);}
    };

    recognition.onresult = (event: { results: { transcript: string }[][] }) => {
      const transcript: string = event.results[0][0].transcript;
      setSpokenText(transcript);
      // Calculate Levenshtein distance and similarity percentage
      const distance = levenshteinDistance(
        filterAlphabetic(transcript.toLocaleLowerCase()),
        filterAlphabetic(givenText[index].toLocaleLowerCase())
      );
      const maxLength = Math.max(transcript.length, givenText[index].length);
      const similarity = Math.max(0, (1 - distance / maxLength) * 100);
    

      setSimilarityPercentage(similarity);

      const animatedText: HTMLElement =
        document.querySelector(".animated-text")!;

      const speech: HTMLElement = document.querySelector(".spoken-text")!;

     
      if (similarity > 95) {
        setTimeout(() => {
       

       
          animatedText.classList.add("slide-in");
          speech.classList.add("slide-in");

          setTimeout(() => {
            handleFront();
          
          }, 1000);
        }, 1000);
      }
    };
    console.log(recognition);
    recognition.onerror = (event: { error:string; }) => {
      console.error('Speech recognition error', event.error);
    };
    
    recognition.start();

  };


  const handleStopListening = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.stop();
    console.log("Audio Stoped");
  };

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

  const handleBack = () => {
    setIndex((prev) => prev - 1);
    setSpokenText("");
    resetAnimation();
  };
  const handleFront = () => {
    setIndex((prev) => prev + 1);
    setSpokenText("");
    resetAnimation();
    setSimilarityPercentage(0);
  };

  return (
    <>
      <header>
        <h1 style={{ position: "absolute", top: "5px", margin: "0" }}>
          Dictie!
        </h1>
      </header>
      <main>
        <div className="absolute-animations">
          {" "}
          <HollowTriangle animationKey={animationKey} />
          <CircleSVG animationKey={animationKey} />
        </div>

        <div className="container-given-text">
          <h1 key={animationKey} className="animated-text">
            {givenText[index]}
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
          <button className="start-btn" onClick={handleVoiceInput}>
            Porniți Înregistrarea Vocală
          </button>
          <button className="stop" onClick={handleStopListening}>
            Stop
          </button>
        </div>
        {spokenText && (
          <div className="spoken-text">
            <h2 className="h2-title"> Dictio-metrul a inteles:</h2>

            <h3 className="spoken">{spokenText}</h3>
          </div>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default VoiceInput;
