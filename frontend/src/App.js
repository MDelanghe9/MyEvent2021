import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import ProfilPage from "./screens/ProfilPage";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
 // const [key, setKey] = useState(process.env.REACT_APP_KEY_API);
  return (
    <Router>
        <main className="App">
          <Route exact path="/" render={(props) => <LoginPage {...props} />} />
          <Route exact path="/home" render={(props) => <HomePage {...props} />} />
          <Route exact path="/login" render={(props) => <LoginPage {...props} />} />
          <Route exact path="/profil" render={(props) => <ProfilPage {...props} />} />
        </main>
    </Router>
  );
}

export default App;
