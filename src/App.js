import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import Header from './components/Header'
import Homepage from './Page/Homepage';
import Login from './Page/Login';
import Upload from './Page/Upload';
import Register from './Page/Register';
import UserPosts from "./Page/HistoryPosts";


function App() {

  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>

          <Route path="/upload">
            <Upload />
          </Route>


          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/user/:slug">
            <UserPosts />
          </Route>



          <Route path="/">
            <Homepage />
          </Route>

        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;