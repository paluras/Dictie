import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VoiceInput from './pages/Level';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/easy" element={<VoiceInput />} />
      </Routes>
    </Router>
  );
}

export default App;