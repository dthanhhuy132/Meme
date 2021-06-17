import { Link } from 'react-router-dom'

export default function PostDetailAsidePost({
  postAside
}) {

  console.log('postAside', postAside);



  return (
    <div className="col-lg-4">
      {/* Liên quan liên quan */}
      <aside className="ass1-aside">
        <div className="ass1-content-head__t">
          <div>Danh mục liên quan</div>
        </div>

        {
          postAside?.map((postCategory, index) => (
            <div className='category-section' key={index}>
              <Link
                to={`/category/${postCategory.tag_index}`}
                className="ass1-head-user__btn-follow ass1-btn category-btn"
              >
                {postCategory.tag_value}
              </Link>
            </div>
          ))
        }


      </aside>
    </div >
  )
}