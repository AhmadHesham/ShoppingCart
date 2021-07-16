import Landing from "./components/pages/Landing";
import AppBar from "./components/navigation/AppBar";
import Cart from './components/pages/Cart'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Router>
        <AppBar />
        <Route exact path="/" render={() => <Landing />}/>
        <Route exact path="/cart" render={() => <Cart />}/>
      </Router>
    </div>
  );
}

export default App;
