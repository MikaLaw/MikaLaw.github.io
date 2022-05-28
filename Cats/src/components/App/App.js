import React from "react";
import "./App.css";
import AppHeader from "../AppHeader";
import { Switch, Route, Redirect } from "react-router-dom";
import CatsPage from "../CatsPage";
import FavoritesPage from "../FavoritesPage";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Switch>
        <Route exact path="/" component={CatsPage} />
        <Route path="/favorites" component={FavoritesPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
