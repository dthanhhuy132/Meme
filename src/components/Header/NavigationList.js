import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from 'react-router-dom'

export default function NavigationList() {
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

  if (!categories) return;
  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <a href="/" onClick={defaultClick}>
            <i className="fas fa-bars dth-header-btn-category dth-header-btn-category-icon"></i>
            <span className='dth-header-btn-category dth-header-btn-category-text'> Danh mục</span>
          </a>
          <div className='ass1-header__nav' style={{ display: 'none' }}>
            <div className="container">
              {
                newCategories.map((categories, index) => (
                  <ul key={index} >
                    {
                      categories.map(category => {
                        const key = category.id;
                        const name = category.id;
                        const tagIndex = category.id
                        return (
                          <li key={key}
                            onClick={defaultClick}
                          >
                            <Link to={`/category/${tagIndex}`} key={name}>{category.text}</Link>
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