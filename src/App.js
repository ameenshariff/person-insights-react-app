import Home from './components/Home'
import History from './components/History';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {


  return (
    <Router>
      <div>
        {/* Renders Navigation bar in all components */}
        <NavBar />
        <Switch>
          <Route exact path="/history">
            {/* Renders 'API query History' on click of History */}
            <History />
          </Route>
          <Route exact path="/">
            {/* Home where we can search for people */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
