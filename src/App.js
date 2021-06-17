import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from './components/Header'
import Login from './Page/Login';
import Upload from './Page/Upload';
import Register from './Page/Register';
import UserPosts from "./Page/UserPosts";
import CategoriesPage from './Page/Category';
import PostDetail from './Page/PostDetail';
import HomePage from './Page/HomePage';


import { actFetchCategoriesAsync } from "./store/categories/actions";
import { actFechMeInfoAsync, USER_ID } from "./store/auth/action";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchCategoriesAsync());
    const userId = localStorage.getItem(USER_ID);
    if (userId && userId !== '') dispatch(actFechMeInfoAsync(userId));
  }, [])


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

          <Route path="/category/:tagIndex">
            <CategoriesPage />
          </Route>

          <Route path="/post/:postid">
            <PostDetail />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>

        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;