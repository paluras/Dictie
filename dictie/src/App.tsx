import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Exercise from "./components/Exercise";
import ExercisesPage from "./pages/ExercisesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/exercises/:level" element={<Exercise />} />
        <Route path="/exercises" element={<ExercisesPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
