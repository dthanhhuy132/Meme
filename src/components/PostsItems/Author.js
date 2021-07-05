import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

export default function Author({
  children,
  userid,
  ...restProps
}) {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const userProfile = currentUser?.USERID;
  const history = useHistory();
  const slugUserID = userProfile === userid ? '/profile' : `/user/${userid}`

  // ________________________________________________________ Check Login
  function handClickOpenLogin(e) {
    const LoginEl = document.querySelector('.dth-btn-login');
    LoginEl.click();
  }

  function handleClickAvatar(evt) {
    evt.preventDefault();
    if (!currentUser) {
      handClickOpenLogin();
    } else {
      history.push(slugUserID)
    }
  }

  return (
    <a href='/' className="ass1-section__name" onClick={handleClickAvatar}> {children}</a >
  )
}