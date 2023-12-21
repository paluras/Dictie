import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Exercise from "./components/exercise/Exercise";
import ExercisesPage from "./pages/ExercisesPage";
import { CollectionProvider } from "./provider/CollectionProvider";



function App() {
  return (
  <CollectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/exercises/:level" element={<Exercise />} />
          <Route path="/exercises" element={<ExercisesPage />} />
        </Routes>
      </Router>
      </CollectionProvider>
  )
}

export default App;
