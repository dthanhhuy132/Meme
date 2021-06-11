import { useState } from "react";
import { useHistory } from "react-router";

export default function HeaderSearch() {
  const history = useHistory();
  const [searchStr, setSearchStr] = useState()

  if (searchStr) {
    history.push('/search?q=' + searchStr)
  }

  return (
    <div className="ass1-header__search">
      <form action="#">
        <label>
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
  )
}