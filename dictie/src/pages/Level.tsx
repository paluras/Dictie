import React, { useEffect, useRef, useState } from "react";
import handleVoiceInput from "../utils/handleVoice.tsx";
import addAnimation from "../utils/addAnimation";
import givenText from "../../db.tsx";
import "../style/style.animations.css";
import "../style/App.css";
import Header from "../components/Header.tsx";
import Animations from "../components/Animations.tsx";
import { Link } from "react-router-dom";

const VoiceInput: React.FC = () => {
  const [spokenText, setSpokenText] = useState<string>("");
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);

  const [speechEnd, setSpeechEnd] = useState<boolean>(true);

  const index = useRef<number>(0);
  const incrementCount = () => {
    index.current++;
    console.log(index.current); // Log the updated count
  };
  const [similarityPercentage, setSimilarityPercentage] = useState<number>(0);
  const [feeling, setFeeting] = useState<string>("");

  // Change this to context in future
  const resetAnimation = () => {
    // Incrementing the animationKey will re-render the component
    setAnimationKey((prevKey) => prevKey + 1);
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
  const backBtn = (
    <Link to="..">
      <button>Back</button>
    </Link>
  );


  const handleVoiceInputCallback = () => {
    handleVoiceInput({
      setUserScore,
      setSpeechEnd,
      givenText: givenText[index.current],
      setSpokenText,
      setSimilarityPercentage,
      speechEnd,
      handleFront,
      spokenText: "",
    });
  };

  return (
    <>
      <Animations animationKey={animationKey} />
      <Header backButton={backBtn} />
      <main>
        <span>{userScore}/{givenText.length}</span>
        <div className="container-given-text">
          <h1 key={animationKey} className="animated-text">
            {givenText[index.current]}
          </h1>
        </div>
        <div className="container-mid">
      {index.current !== 0 && <button className="back" onClick={() => handleBack()}>
        Back
      </button>}
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
