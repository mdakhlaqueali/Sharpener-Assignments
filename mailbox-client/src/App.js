import Navigation from './components/Navigation';
import './App.css';
import AuthForm from './components/Auth';
import HomePage from './components/Home';
import Mail from './components/Mail';
import {Route, Routes, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
    <Navigation/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
        {!isLoggedIn && <Route path="/login" element={<AuthForm/>}/>}
        {isLoggedIn && <Route path='/mail' element={<Mail/>}/>}
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </div>
  );
}

export default App;
