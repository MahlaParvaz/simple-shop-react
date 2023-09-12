import './App.css';
import CardPage from './pages/CardPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardProvider from './providers/CardProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPAge from './pages/CheckOutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
function App() {
  return (
    <Router>
      <CardProvider>
        <ToastContainer />
        <Routes>
          <Route path="/card" element={<CardPage />} />
          <Route path="/checkout" element={<CheckOutPAge />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </CardProvider>
    </Router>
  );
}

export default App;
