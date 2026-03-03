import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import PrivacyPolicy from './components/PrivacyPolicy';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
