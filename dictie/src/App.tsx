import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VoiceInput from './pages/Level';
import ExercisesPage from './pages/ExercisesPage';
import {givenText, givenText2} from '../db.tsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/easy" element={<VoiceInput questions={givenText}  />} />
        <Route path="/easy-two" element={<VoiceInput  questions={givenText2} />} />
        <Route path='/exercises' element={<ExercisesPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;