import React,{useState} from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
function App() {
  
  const [alert, setAlert] = useState(null)

  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        
        <Router>
          <Navbar />
          <Alert alert={alert}/> 
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home  showAlert={showAlert}/>}>
              </Route>
              <Route exact path="/About" element={<About />}>
              </Route>
              <Route exact path="/Login" element={<Login showAlert={showAlert}/>}>
              </Route>
              <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
