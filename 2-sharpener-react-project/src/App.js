import { CandyProvider } from './store/CandyContext';
import CandyForm from './components/CandyForm';
import CandyList from './components/CandyList';
import Cart from './components/Cart';
import './App.css';

function App() {

  return (
    <div className="App">
      <CandyProvider>
      <div>
      <Cart/>
        <CandyForm />
        <CandyList />
      </div>
    </CandyProvider>
    </div>
  );
}

export default App;
