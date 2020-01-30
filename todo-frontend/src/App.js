import React, { Component } from "react";
import "./App.css";
import fire from "./config/fire";
import { Link, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import AddToDo from "./components/AddToDo";
import SignIn from "./components/SignIn";

export const AuthContext = React.createContext(null);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        });
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/add">
                <AddToDo />
              </Route>
            </Switch>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    );
  }
}

export default App;
