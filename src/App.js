import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from './components/Header';
import FooterResponsive from './components/FooterResponsive';
import UserPosts from "./Page/UserPosts";
import CategoriesPage from './Page/Category';
import PostDetail from './Page/PostDetail';
import SearchPage from './Page/Search';
import Upload from './Page/Upload';
import Profile from './Page/ProfilePage';
import HomePage from './Page/HomePage';
import EditPostResponsive from './Page/EditPostResponsive'

import { actFetchCategoriesAsync } from "./store/categories/actions";
import { actFechMeInfoAsync, USER_ID } from "./store/auth/action";


function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(actFetchCategoriesAsync());
    const userId = localStorage.getItem(USER_ID);
    if (userId && userId !== '') dispatch(actFechMeInfoAsync(userId));
    // eslint-disable-next-line
  }, [])


  return (
    <BrowserRouter>

      <Header />

      <Switch>
        <Route path="/upload">
          <Upload />
        </Route>

        <Route path="/user/:slug">
          <UserPosts />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/category/:tagIndex">
          <CategoriesPage />
        </Route>

        <Route path="/post/:postid">
          <PostDetail />
        </Route>

        <Route path="/search">
          <SearchPage />
        </Route>


        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/edit">
          <EditPostResponsive />
        </Route>

      </Switch>

      <FooterResponsive />

    </BrowserRouter >
  )
}

export default App;