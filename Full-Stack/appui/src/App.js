import {BrowserRouter, Route, Switch, } from 'react-router-dom'

import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Settings from './components/Settings/Settings';
import Home from './components/Home/Home';
import Single from './components/Single/Single';
import Write from './components/Write/Write';
import { useContext } from 'react';
import { Context } from './context/Context';


function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
       <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </BrowserRouter>
  );
} 

export default App;


