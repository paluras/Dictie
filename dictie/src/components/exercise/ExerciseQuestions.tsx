interface ExerciseQuestionsProps {
  animationKey: number;
  questions: string[];
  index: React.MutableRefObject<number>;
}

const ExerciseQuestions: React.FC<ExerciseQuestionsProps> = ({
  animationKey,
  questions,
  index,
}) => {
  // Add your component logic here

  return (
    <div className="container-given-text">
      <h1 key={animationKey} className="animated-text">
        {questions[index.current]}
      </h1>
    </div>
  );
};

export default ExerciseQuestions;
