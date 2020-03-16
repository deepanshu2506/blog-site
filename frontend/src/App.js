import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home/home";
import Header from "./components/header/header";
import NewPost from "./components/newPost/newPost";

import logo from "./logo.svg";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/add-new-post" component={NewPost} />
      </Switch>
    </div>
  );
}

export default App;
