import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import DotLoading from '../common/Loading/DotLoading';


export default function Author({
  children,
  userid,
  handleFromSearchPage,
  ...restProps
}) {

  const currentUser = useSelector(state => state.Auth.currentUser);
  const userProfile = currentUser?.USERID;
  const history = useHistory();
  const location = useLocation();
  const slugUserID = userProfile === userid ? '/profile' : `/user/${userid}`;

  const [isLoadingUserPage, setIsLoadingUserPage] = useState(false);

  // ________________________________________________________ Check Login
  function handClickOpenLogin(e) {
    const LoginEl = document.querySelector('.dth-btn-login');
    LoginEl.click();
  }

  function handleClickAvatar(evt) {
    evt.preventDefault();
    if (!currentUser) {
      handClickOpenLogin();
    }
    if (location.pathname.indexOf('/search') === -1) {
      history.push(slugUserID)
    } else {
      setIsLoadingUserPage(true)
      handleFromSearchPage()
    }
  }

  return (

    <a href='/' className="ass1-section__name" onClick={handleClickAvatar}
    >
      {children}
      {isLoadingUserPage &&
        <div className='loading-user-page'>
          <DotLoading />
        </div>}
    </a >

  )
}