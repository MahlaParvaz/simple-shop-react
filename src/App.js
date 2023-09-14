import './App.css';
import CardPage from './pages/CardPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardProvider from './providers/CardProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPage from './pages/CheckOutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AuthProvider from './providers/AuthProvider';
function App() {
  return (
    <Router>
      <AuthProvider>
        <CardProvider>
          <ToastContainer />
          <Routes>
            <Route path="/card" element={<CardPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </CardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
