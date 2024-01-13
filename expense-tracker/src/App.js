import Navigation from './components/Navigation/Navigation';
import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import HomePage from './components/Pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import {Route, Routes, Navigate} from 'react-router-dom';
import Profile from './components/Pages/Profile';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
    <Navigation/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
        {authCtx.isLoggedIn && <Route path="/profile" element={<Profile/>}/>}
        {!authCtx.isLoggedIn && <Route path="/login" element={<AuthForm/>}/>}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </>
  );
}

export default App;