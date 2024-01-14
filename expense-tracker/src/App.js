import Navigation from './components/Navigation/Navigation';
import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import HomePage from './components/Pages/HomePage';
import {Route, Routes, Navigate} from 'react-router-dom';
import Profile from './components/Pages/Profile';
import ForgotPasswordPage from './components/AuthForm/ForgotPassword';
import Expenses from './components/Pages/Expenses/Expenses';
import {useSelector} from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
    <Navigation/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
        {isLoggedIn && <Route path="/profile" element={<Profile/>}/>}
        {isLoggedIn && <Route path="/expenses" element={<Expenses/>}/>}
        {!isLoggedIn && <Route path="/login" element={<AuthForm/>}/>}
        {isLoggedIn && <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </>
  );
}

export default App;
