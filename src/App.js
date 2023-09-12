import './App.css';
import CardPage from './pages/CardPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardProvider from './providers/CardProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Router>
      <CardProvider>
        <ToastContainer />
        <Routes>
          <Route path="/card" element={<CardPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </CardProvider>
    </Router>
  );
}

export default App;
