


interface ScoreBoardProps {
  questions: string[];
  userScore: number;
}

const ScoreBoard = ({ questions, userScore }: ScoreBoardProps) => {


    
  return (
    <span className="score-board">
      {userScore}/{questions.length}
    </span>
  );
};

export default ScoreBoard;
