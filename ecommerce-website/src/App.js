import './App.css';
import Showproducts from './components/Showproducts';
import MyNavbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Showproducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/auth" element={<AuthPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
