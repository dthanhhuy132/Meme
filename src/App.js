import React, { createContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import ProfilePicture from './Page/UserPosts/ProfilePicture'

import { actFetchCategoriesAsync } from "./store/categories/actions";
import { actFechMeInfoAsync, USER_ID } from "./store/auth/action";

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './theme.js';
import DarkMode from './hooks/useDarkMode';

import { notification } from 'antd';


export const ThemeContext = createContext('');

function App() {
  const dispatch = useDispatch();
  let { theme, toggleTheme } = DarkMode();

  useEffect(() => {
    dispatch(actFetchCategoriesAsync());
    const userId = localStorage.getItem(USER_ID);
    if (userId && userId !== '') {
      dispatch(actFechMeInfoAsync(userId))
    }

    if (!userId && theme === 'light') {
      setTimeout(() => {
        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Đăng nhập để trải nghiệm giao diện tối')
      }, 10000)
    }

    if (userId && theme === 'light') {
      setTimeout(() => {
        (function openNotification(placement) {
          notification.success({
            message: `${placement}`,
            description: "",
            className: 'dth-background-notification',
            duration: 4.5,
            closeIcon: <i className="fas fa-times"></i>,
            placement,
          });
        })('Thử trải nghiệm giao diện tối nào!!!')
      }, 10000)
    }

    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <BrowserRouter>

        <Header toggleTheme={toggleTheme} theme={theme} />

        <Switch>
          <ThemeContext.Provider value={theme}>
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

            <Route path='/ProfilePicture'>
              <ProfilePicture />
            </Route>

            <Route exact path="/">
              <HomePage />
            </Route>

            <Route>
              <EditPostResponsive theme={theme} />
            </Route>

          </ThemeContext.Provider>

        </Switch>

        <FooterResponsive toggleTheme={toggleTheme} theme={theme} />
      </BrowserRouter >

    </ThemeProvider >
  )
}

export default App;