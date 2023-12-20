import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Exercise from "./components/Exercise";
import ExercisesPage from "./pages/ExercisesPage";
import { CollectionContext  } from "./context/CollectionContext";
import { useState } from "react";

type CollectionContextType = {
  document: string;
  setDocument: (doc: string) => void;
};


function App() {

  const [document, setDocument] = useState("exercises-easy");

  return (
    <CollectionContext.Provider value={{ document, setDocument } as CollectionContextType}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/exercises/:level" element={<Exercise />} />
          <Route path="/exercises" element={<ExercisesPage />} />
        </Routes>
      </Router>
    </CollectionContext.Provider>
  );
}

export default App;
