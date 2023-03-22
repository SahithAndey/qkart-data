import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch,BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
  //endpoint: `http://localhost:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/" component={Products}/>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
