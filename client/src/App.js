import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);

  return (
    <Router>
      <div className="App">
      <h1>Welcome to the Bubble App!</h1>
        <Link to="/login">Login</Link>
        <Link to="bubblepage">Dashboard</Link>
        
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/bubblepage" component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
