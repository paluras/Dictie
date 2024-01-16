import { Link } from "react-router-dom";

const CreateExercise = () => {
    return(
      <>
      <Link to="/create-exercise">
        <button type="button">Creează exercițiu</button>
      </Link>
      </>
    )
  }

  export default CreateExercise;