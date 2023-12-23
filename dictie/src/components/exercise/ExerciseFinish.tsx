
import { Link } from 'react-router-dom';

interface ExerciseFinishProps {
   animationKey: number;
}

const ExerciseFinish: React.FC<ExerciseFinishProps> = ({animationKey}) => {
    // Add your component logic here

    return (
        <div className="container-given-text">
        <h1 key={animationKey} className="animated-text">
          Felicitari ai terminat exercitiul!
        </h1>
        <Link to="/exercises">
          <button type='button' className="animated-text">Continua</button>
        </Link>
      </div>
    );
};

export default ExerciseFinish;
