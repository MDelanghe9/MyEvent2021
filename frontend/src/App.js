import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import Login from "./screens/Login";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
 // const [key, setKey] = useState(process.env.REACT_APP_KEY_API);
  return (
    <Router>
        <main className="App">
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
        </main>
    </Router>
  );
}

export default App;
