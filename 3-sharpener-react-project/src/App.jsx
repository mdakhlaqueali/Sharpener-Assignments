// import "./App.css";
import ShoeNavbar from "./components/Navbar";

import AllRoutes from "./components/AllRoutes";

// import ShoeAddnPrint from "./components/shoeAddnPrint";

function App() {
  return (
    <div className="App">
      {/* <h1>This is app.jsx</h1> */}
       <ShoeNavbar />
      {/* <ShoeAddnPrint />  */}
      <AllRoutes />
    </div>
  );
}

export default App;