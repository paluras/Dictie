import { useCallback, useEffect, useRef, useState } from "react";
import handleVoiceInput from "../utils/handleVoice.tsx";
import addAnimation from "../utils/addAnimation.tsx";
import { useSetFeeling } from "../hooks/useSetFeeling.tsx";
import "../style/style.animations.css";
import "../style/App.css";
import Header from "../components/Header.tsx";
import Animations from "../components/Animations.tsx";
import percentageFunc from "../utils/percentCalc.tsx";
import manageScore from "../utils/manageScore.tsx";
import ScoreBoard from "../components/exercise/ScoreBoard.tsx";
import { useScoreBoard } from "../hooks/useScoreBoard.tsx";
import ExerciseFinish from "../components/exercise/ExerciseFinish.tsx";
import ExerciseQuestions from "../components/exercise/ExerciseQuestions.tsx";
import BackBtn from "../components/BackBtn.tsx";

interface VoiceInputProps {
  questions: string[];
}

const VoiceInput: React.FC<VoiceInputProps> = ({ questions }) => {
  // State from handle voice
  const [spokenText, setSpokenText] = useState<string>("");
  const [speechEnd, setSpeechEnd] = useState<boolean>(true);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const index = useRef<number>(0);
  const [feeling, setFeeting] = useState<string>("😊 Sa incepem");
  const similar = percentageFunc(spokenText, questions[index.current]);
  const useSetFeelingValue = useSetFeeling(similar, feeling, setFeeting);
  const scoreboard = manageScore(similar);
  const userScore = useScoreBoard({ scoreboard, speechEnd });

  const resetAnimation = useCallback(() => {
    // Incrementing the animationKey will re-render the component
    setAnimationKey((prevKey) => prevKey + 1);
  }, [setAnimationKey]);

  const resetValues = () => {
    resetAnimation();
    setSpokenText("");
    setFeeting("😊 Sa incepem");
    const scoreboard = document.querySelector(".score-board") as HTMLElement;
    scoreboard.style.color = "black";
  };

  const handleBack = () => {
    addAnimation();
    resetValues();
    index.current--;
  };

  const handleFront = useCallback(async () => {
    await addAnimation();
    resetValues();
    index.current++;
  }, [resetAnimation]);

  // Wait half a sec for the speech to end and then go to the next question
  useEffect(() => {
    setTimeout(() => {
      if (speechEnd && spokenText) {
        console.log("USE EFFECT");
        handleFront();
      }
    }, 500);
  }, [speechEnd]);

 

  const handleVoiceInputCallback = () => {
    handleVoiceInput({
      setSpeechEnd,
      setSpokenText,
      speechEnd,
    });
  };

  return (
    <>
      <Animations animationKey={animationKey} />
      <Header backButton={<BackBtn />} logInBtn={false} />
      <main className="main-exercise">
        <ScoreBoard questions={questions} userScore={userScore} />
        {/* IF THE EXERCISE IS OVER = DISPLAY END */}
        {index.current === questions.length ? (
          <ExerciseFinish animationKey={animationKey} />
        ) : (
          <ExerciseQuestions
            animationKey={animationKey}
            questions={questions}
            index={index}
          />
        )}

        {index.current === questions.length ? (
          ""
        ) : (
          <>
            <div className="container-mid">
              <svg
                className="back-arrow"
                onClick={() => (speechEnd ? handleBack() : "")}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height={index.current == 0 || !speechEnd ? "0" : "40"}
                viewBox="0 0 175 255"
                fill="#black"
                transform="rotate(180)"
              >
                <path
                  d="M47.7037 0L0 47.7037L79.5061 127.21L0 206.716L47.7037 254.419L174.913 127.21L47.7037 0Z"
                  fill="#E5E580"
                />
              </svg>

              <p className="similar-container">
                Similaritate: {similar.toFixed(1)}% <br />
                {useSetFeelingValue}
              </p>
              {/* Make function to add the overall score somewhere and reset it */}

              <svg
                onClick={() => (speechEnd ? handleFront() : "")}
                className="front-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height={!speechEnd ? "0" : "40"}
                viewBox="0 0 175 255"
                fill="#black"
              >
                <path
                  d="M47.7037 0L0 47.7037L79.5061 127.21L0 206.716L47.7037 254.419L174.913 127.21L47.7037 0Z"
                  fill="#E5E580"
                />
              </svg>
            </div>

            <div className="container-btns">
              {" "}
              <button
                type="button"
                style={{ display: speechEnd ? "flex" : "none" }}
                className="start-btn"
                onClick={handleVoiceInputCallback}
              >
                Porniți Înregistrarea Vocală
              </button>
              <button
                type="button"
                style={{ display: speechEnd ? "none" : "flex" }}
                className="stop"
              >
                Stop
              </button>
            </div>
          </>
        )}
        {spokenText && (
          <div className="spoken-text">
            <h2 className="h2-title"> Dictie-metrul a inteles:</h2>
            <h3 className="spoken">{spokenText}</h3>
          </div>
        )}
      </main>
     
    </>
  );
};

export default VoiceInput;
