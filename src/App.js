import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch,BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout"

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
          <Route path="/checkout" component={Checkout}/>

          <Route exact path="/" component={Products}/>
          
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
