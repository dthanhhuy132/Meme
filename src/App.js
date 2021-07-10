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

import { AnimatePresence } from 'framer-motion'

function App() {
  const dispatch = useDispatch();
  let { theme, toggleTheme } = DarkMode();

  useEffect(() => {
    dispatch(actFetchCategoriesAsync());
    const userId = localStorage.getItem(USER_ID);
    if (userId && userId !== '') dispatch(actFechMeInfoAsync(userId));
    // eslint-disable-next-line
  }, []);



  const AnimateComponent = () => {
    let location = useLocation();

    return (
      <>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
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
              <EditPostResponsive theme={theme} />
            </Route>
          </Switch>
        </AnimatePresence>
        <FooterResponsive toggleTheme={toggleTheme} theme={theme} />
      </>
    )
  }


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>

        <AnimateComponent />

      </BrowserRouter >

    </ThemeProvider >
  )
}

export default App;