import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import RecipeInfo from "./components/recipeInfo";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recipe/:id" exact component={RecipeInfo} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
