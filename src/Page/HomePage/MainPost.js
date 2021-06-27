import Button from '../../components/common/Button'
import UsePaging from '../../hooks/usePaging';
import Post from '../../components/PostsItems';


export default function MainPost() {

  const {
    posts,
    handleLoadMore,
    isLoading
  } = UsePaging();



  return (
    <div className="col-lg-8">
      <div className="ass1-section__list">

        {
          posts.map(post => (
            <Post
              key={post.PID}
              post={post}
            ></Post>
          ))
        }
      </div>
      <Button variant='loadmore' onClick={handleLoadMore} isLoading={isLoading}>Xem thêm</Button>
    </div>
  )
}