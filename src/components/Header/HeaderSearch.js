import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

export default function HeaderSearch() {
  const history = useHistory();
  const location = useLocation();
  const [searchStr, setSearchStr] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (searchStr) history.push('/search?q=' + searchStr)
    if (searchStr === '' && location.pathname.indexOf('/search') !== -1) {
      history.push('/');
    }
    return () => { }
    // eslint-disable-next-line
  }, [searchStr])

  // useEffect(() => {
  //   if (location.pathname.indexOf('/search') === -1) setSearchStr('')
  // }, [location.pathname])

  return (
    <div className='header-for-responsive'>
      <div className="ass1-header__search header-search-responsive-mobile">
        <form action="/" onSubmit={handleSubmit}>
          <label>
            <i className="fas fa-search icon-Search"></i>
            <input
              type="search"
              name="search-text"
              className="form-control"
              placeholder="Nhập từ khóa ..."
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <i className="fas fa-search icon-Search"></i>
          </label>
        </form>
      </div>
    </div>

  )
}