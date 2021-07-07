import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
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
import EditPostResponsive from './Page/EditPostResponsive';

import { actFetchCategoriesAsync } from "./store/categories/actions";
import { actFechMeInfoAsync, USER_ID } from "./store/auth/action";

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './theme.js';
import DarkMode from './hooks/useDarkMode';



function App() {
  const dispatch = useDispatch();
  let { theme, toggleTheme } = DarkMode();

  useEffect(() => {
    dispatch(actFetchCategoriesAsync());
    const userId = localStorage.getItem(USER_ID);
    if (userId && userId !== '') dispatch(actFechMeInfoAsync(userId));
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header toggleTheme={toggleTheme} theme={theme} />

        <Switch>

          <Route path="/upload" >
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

          <Route>
            <EditPostResponsive />
          </Route>
        </Switch>

        <FooterResponsive toggleTheme={toggleTheme} theme={theme} />

      </BrowserRouter >

    </ThemeProvider >
  )
}

export default App;