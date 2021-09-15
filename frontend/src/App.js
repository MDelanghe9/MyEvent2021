import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
 // const [key, setKey] = useState(process.env.REACT_APP_KEY_API);
  return (
    <Router>
        <main className="App">
          <Route exact path="/" render={(props) => <HomePage {...props} />} />
        </main>
    </Router>
  );
}

export default App;
