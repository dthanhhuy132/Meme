import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import HeaderSearch from './HeaderSearch';
import NavigationList from './NavigationList';

export default function Header() {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const userName = currentUser?.fullname

  const linkToProfile = userName ? '/profile' : '/login'

  return (
    <>
      <header>
        <div className="ass1-header">
          <div className="container">
            <Link to="/" className="ass1-logo">TCL Meme</Link>
            <NavigationList />
            <HeaderSearch />
            <Link to="/upload" className="ass1-header__btn-upload ass1-btn btn-header"><i className="fas fa-upload" /> Upload</Link>
            <Link to={linkToProfile} className="ass1-header__btn-upload ass1-btn"><i className="fas fa-user" /> {userName || 'Login'}</Link>

          </div>
        </div>
      </header >
    </>
  )
}

