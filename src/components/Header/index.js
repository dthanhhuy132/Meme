import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux'
import HeaderSearch from './HeaderSearch';

export default function Header() {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const userName = currentUser?.user?.fullname


  return (
    <>
      <header>
        <div className="ass1-header">
          <div className="container">
            <Link to="/" className="ass1-logo">
              TCL Meme
          </Link>
            <nav>
              <ul className="ass1-header__menu">
                <li>
                  <Link to="/">Danh mục</Link>
                  <div className="ass1-header__nav" style={{ display: 'none' }}>
                    <div className="container">
                      <ul>
                        <li><Link to="/">Funny</Link></li>
                        <li><Link to="/">Animals</Link></li>
                        <li><Link to="/">Anime &amp; Mâng</Link></li>
                        <li><Link to="/">Awesome</Link></li>
                        <li><Link to="/">Basketball</Link></li>
                      </ul>
                      <ul>
                        <li><Link to="/">Car</Link></li>
                        <li><Link to="/">Comic</Link></li>
                        <li><Link to="/">Cosplay</Link></li>
                        <li><Link to="/">Countryballs</Link></li>
                        <li><Link to="/">Classical Art Memes</Link></li>
                      </ul>
                      <ul>
                        <li><Link to="/">Girl</Link></li>
                        <li><Link to="/">History</Link></li>
                        <li><Link to="/">K-POP</Link></li>
                        <li><Link to="/">V-POP</Link></li>
                        <li><Link to="/">Pokémon</Link></li>
                      </ul>
                      <ul>
                        <li><Link to="/">School</Link></li>
                        <li><Link to="/">Star war</Link></li>
                        <li><Link to="/">Coder</Link></li>
                        <li><Link to="/">Travel</Link></li>
                        <li><Link to="/">Sport</Link></li>
                      </ul>
                    </div>
                    <div className="ass1-header__menu-transition" />
                  </div>
                </li>
                <li className="active">
                  <Link to="/">Hot</Link>
                  <div className="ass1-header__nav" style={{ display: 'none' }}>
                    <div className="container">
                      <ul>
                        <li><Link to="/">Funny</Link></li>
                        <li><Link to="/">Animals</Link></li>
                        <li><Link to="/">Anime &amp; Mâng</Link></li>
                        <li><Link to="/">Awesome</Link></li>
                        <li><Link to="/">Basketball</Link></li>
                      </ul>
                      <ul>
                        <li><Link to="/">Car</Link></li>
                        <li><Link to="/">Comic</Link></li>
                        <li><Link to="/">Cosplay</Link></li>
                        <li><Link to="/">Countryballs</Link></li>
                        <li><Link to="/">Classical Art Memes</Link></li>
                      </ul>
                      <ul>
                        <li><Link to="/">Girl</Link></li>
                        <li><Link to="/">History</Link></li>
                        <li><Link to="/">K-POP</Link></li>
                        <li><Link to="/">V-POP</Link></li>
                        <li><Link to="/">Pokémon</Link></li>
                      </ul>
                      <ul>
                        <li><Link to="/">School</Link></li>
                        <li><Link to="/">Star war</Link></li>
                        <li><Link to="/">Coder</Link></li>
                        <li><Link to="/">Travel</Link></li>
                        <li><Link to="/">Sport</Link></li>
                      </ul>
                    </div>
                    <div className="ass1-header__menu-transition" />
                  </div>
                </li>
              </ul>
            </nav>
            <HeaderSearch />
            <Link to="/upload" className="ass1-header__btn-upload ass1-btn btn-header"><i className="fas fa-upload" /> Upload</Link>
            <Link to="/login" className="ass1-header__btn-upload ass1-btn"><i className="fas fa-user" /> {userName || 'Login'}</Link>

          </div>
        </div>
      </header >
    </>
  )
}

