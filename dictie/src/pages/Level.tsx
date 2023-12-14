import React, { useEffect, useRef, useState } from "react";
import handleVoiceInput from "../utils/handleVoice.tsx";
import addAnimation from "../utils/addAnimation";
import givenText from "../../db.tsx";
import "../style/style.animations.css";
import "../style/App.css";
import Header from "../components/Header.tsx";
import Animations from "../components/Animations.tsx";
import { Link } from "react-router-dom";
import percentageFunc from "../utils/percentCalc.tsx";
import manageScore from "../utils/manageScore.tsx";

const VoiceInput: React.FC = () => {
  // State from handle voice
  const [spokenText, setSpokenText] = useState<string>("");
  const [speechEnd, setSpeechEnd] = useState<boolean>(true);

  console.log(speechEnd);
  console.log(spokenText);

  const [animationKey, setAnimationKey] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const index = useRef<number>(0);

  const [feeling, setFeeting] = useState<string>("😊 Sa incepem");
  const similar = percentageFunc(spokenText, givenText[index.current]);
  const scoreboard = manageScore(similar);
  console.log(scoreboard);

  // Change this to context in future
  const resetAnimation = () => {
    // Incrementing the animationKey will re-render the component
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // console.log(incrementScore());

  const handleBack = async () => {
    await addAnimation();
    resetAnimation();
    addAnimation();
    setSpokenText("");
    resetAnimation();
    index.current--;
  };

  const handleFront = async () => {
    await addAnimation();
    resetAnimation();
    index.current++;
    setSpokenText("");
    setFeeting("😊 Sa incepem");
    const scoreboard = document.querySelector(".score-board") as HTMLElement;
    scoreboard.style.color = "black";
  };

  useEffect(() => {
    if (speechEnd && spokenText !== "") {
      handleFront();
    }
  }, [speechEnd, spokenText]);

  // Change text based on similarity
  useEffect(() => {
    if (similar === 0) return;
    similar < 5
      ? setFeeting("😊 Sa incepem")
      : similar <= 50
      ? setFeeting("😔 Poți face mai bine")
      : similar > 50 && similar < 80
      ? setFeeting("😯 Te apropii!")
      : similar > 80 && similar < 90
      ? setFeeting("😃 Lucru excelent!")
      : similar > 90
      ? setFeeting("😍 Ai făcut uimitor!")
      : setFeeting("");
  }, [similar]);

  useEffect(() => {
    if (scoreboard === "point" && speechEnd) {
      const scoreboard = document.querySelector(".score-board") as HTMLElement;
      scoreboard.style.color = "green";
      setUserScore((prev) => prev + 1);
    } else if (scoreboard === "no point" && speechEnd) {
      const scoreboard = document.querySelector(".score-board") as HTMLElement;
      scoreboard.style.color = "red";
    }
  }, [speechEnd, scoreboard]);

  const backBtn = (
    <Link to="..">
      <button>Back</button>
    </Link>
  );

  const handleVoiceInputCallback = () => {
    handleVoiceInput({
      setSpeechEnd,
      setSpokenText,
      speechEnd,
    });
  };

  console.log(similar);

  return (
    <>
      <Animations animationKey={animationKey} />
      <Header backButton={backBtn} />
      <main>
        <span className="score-board">
          {userScore}/{givenText.length}
        </span>
        <div className="container-given-text">
          <h1 key={animationKey} className="animated-text">
            {givenText[index.current]}
          </h1>
        </div>
        <div className="container-mid">
          {index.current !== 0 || speechEnd && (
            <svg
              className="back-arrow"
              onClick={() => (speechEnd ? handleBack() : "")}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 175 255"
              fill="#black"
              transform="rotate(180)"
            >
              <path
                d="M47.7037 0L0 47.7037L79.5061 127.21L0 206.716L47.7037 254.419L174.913 127.21L47.7037 0Z"
                fill="#E5E580"
              />
            </svg>
          )}
          <p className="similar-container">
            Similaritate: {similar.toFixed(1)}% <br />
            {feeling}
          </p>
          {/* Make function to add the overall score somewhere and reset it */}
      {speechEnd && <svg   onClick={() => (speechEnd ? handleFront() : "")}
          className="front-arrow"
        
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 175 255"
          fill="#black"
          
        >
          <path
            d="M47.7037 0L0 47.7037L79.5061 127.21L0 206.716L47.7037 254.419L174.913 127.21L47.7037 0Z"
            fill="#E5E580"
          />
        </svg>}
           
          
         
           
         
        </div>
        <div className="container-btns">
          {" "}
          <button
            style={{ display: speechEnd ? "flex" : "none" }}
            className="start-btn"
            onClick={handleVoiceInputCallback}
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
