import { useEffect, useState } from "react";

interface ScoreBoardProps {
  scoreboard: string | undefined;
  speechEnd: boolean;
}

export const useScoreBoard = ({ scoreboard, speechEnd }: ScoreBoardProps) => {
  const [userScore, setUserScore] = useState<number>(0);
 
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

  return userScore;
};
