import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreate from "./components/RecipeCreate";
import Detail from "./components/Detail";
import Error from "./components/Error";

import axios from "axios";

axios.defaults.baseURL = "https://pi-food-production-2c99.up.railway.app/";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* el Switch va a envolver a cada ruta y va de ruta a ruta. Si el link no existe te toma el ultimo */}
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/recipe" component={RecipeCreate}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/error" component={Error}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
