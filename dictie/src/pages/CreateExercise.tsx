import "../style/style.createExercise.css";
import { setFirebaseCreatedArray } from "../utils/firebase";
import { Link } from "react-router-dom";
import { v4 } from "uuid"; // import uuid to generate unique id
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
const CreateExercise: React.FC = () => {
  const user = useContext(AuthContext);
  const dialog = document.querySelector("dialog");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const exercise = {
      id: v4(), // generate unique id
      arrayValue: [] as string[],
      title: data.title as string, // assuming you have a title field in your form
    };

    // loop through the form data and push all arrayValue entries into the array
    for (const key of formData.keys()) {
      if (key.startsWith("arrayValue")) {
        const value = formData.get(key);
        if (typeof value === "string" && value.length > 0) {
          exercise.arrayValue.push(value);
        }
      }
    }

    console.log(exercise);
    if (!user) return;
    setFirebaseCreatedArray(user.uid, exercise);
    ("Exercitiul a fost creat cu succes!");
    form.reset();
    dialog?.showModal();
  };

  const backBtn = (
    <div className="back-btn">
      <Link to="/exercises">
        <button type="button">Exercitii</button>
      </Link>
    </div>
  );

  const dialogBox = (
    <dialog>
      <p>Exercițiul a fost creat cu succes!</p>
      <form method="dialog">
        <button onClick={() => dialog?.close()} type="button">
          OK
        </button>
      </form>
    </dialog>
  );

  return (
    <>
      <Header backButton={backBtn} logInBtn={true} />
      {dialogBox}
      <form action="post" onSubmit={handleSubmit}>
        <label className="create-exercise-label">
          {" "}
          Creează exercițiu
          <input type="text" name="title" placeholder="Titlu" />{" "}
          {/* add title field */}
          <textarea
            placeholder="Intrebarea 1"
            name="arrayValue1"
            cols={30}
            rows={2}
          ></textarea>
          <textarea
            placeholder="Intrebarea 2"
            name="arrayValue2"
            cols={30}
            rows={2}
          ></textarea>
          <textarea
            placeholder="Intrebarea 3"
            name="arrayValue3"
            cols={30}
            rows={2}
          ></textarea>
          <textarea
            placeholder="Intrebarea 4"
            name="arrayValue4"
            cols={30}
            rows={2}
          ></textarea>
          <textarea
            placeholder="Intrebarea 5"
            name="arrayValue5"
            cols={30}
            rows={2}
          ></textarea>
          <button type="submit"> Creează! </button>
        </label>
      </form>
    </>
  );
};

export default CreateExercise;
