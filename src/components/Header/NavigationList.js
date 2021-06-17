import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';



export default function NavigationList() {
  const history = useHistory();
  const categories = useSelector(state => state.Categories.categories);

  const newCategories = [];
  function chunkCategory(arr, size) {
    const categoriesTemp = [...arr];
    while (categoriesTemp.length) {
      newCategories.push(categoriesTemp.splice(0, size))
    }
    return newCategories
  };
  chunkCategory(categories, 6)

  function defaultClick(e) {
    e.preventDefault()
  }

  function clickOnCategory(e, category) {
    e.preventDefault();

    const tagIndex = category.id
    history.push(`/category/${tagIndex}`)

    const navEl = document.querySelector('.ass1-header__menu .ass1-header__nav')
    navEl.style.display = 'none';

  }

  if (!categories) return;
  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <a href="/" onClick={defaultClick}>Danh mục</a>
          <div className="ass1-header__nav" style={{ display: 'none' }}>
            <div className="container">
              {
                newCategories.map((categories, index) => (
                  <ul key={index} >
                    {
                      categories.map(category => {
                        const key = category.id;
                        const name = category.id;
                        return (
                          <li key={key}
                            onClick={(e) => clickOnCategory(e, category)}>
                            <a href="/" key={name} >{category.text}</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                ))
              }
            </div>
            <div className="ass1-header__menu-transition" />
          </div>
        </li>
      </ul>
    </nav >
  )
}