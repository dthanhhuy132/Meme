import { Link } from 'react-router-dom'
import DotLoading from '../../components/common/Loading/DotLoading'


export default function PostDetailAsidePost({
  postAside,
  isLoadingCategory
}) {


  return (
    <>
      <div className="col-lg-4">
        {/* Liên quan liên quan */}
        <aside className="ass1-aside">
          <div className="ass1-content-head__t">
            <div>Danh mục liên quan</div>
          </div>

          {
            !isLoadingCategory
              ?
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
              : <DotLoading />
          }
        </aside>
      </div >
    </>
  )
}