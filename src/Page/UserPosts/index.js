import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { actFetchPostsByUserIdAsync } from '../../store/posts/action';
import Information from './Information';
import Post from '../../components/PostsItems';

export default function UserPosts() {
  const param = useParams();
  const dispatch = useDispatch();
  const userPosts = useSelector(state => state.Posts.userPosts)
  console.log('userPosts', userPosts)



  const slug = param.slug;

  useEffect(() => {
    dispatch(actFetchPostsByUserIdAsync(slug))
  }, [slug])


  return (
    <div className="container">
      <Information />

      <Post />


      <div className="ass1-section__wrap row ass1-section__isotope-init" style={{ position: 'relative', height: '2935.84px' }}>
        <div className="ass1-section__item col-lg-6" style={{ position: 'absolute', left: '0%', top: '0px' }}>
          <div className="ass1-section">
            <div className="ass1-section__head">
              <a href="single_post.html" className="ass1-section__avatar ass1-avatar"><img src="images/avatar-02.png" alt="" /></a>
              <div>
                <a href="/" className="ass1-section__name">Thanos</a>
                <span className="ass1-section__passed">2 giờ trước</span>
              </div>
            </div>
            <div className="ass1-section__content">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore obcaecati eum deserunt ut,
                aperiam quas! Placeat blanditiis consequatur, deserunt facere iusto amet a ad suscipit laudantium unde
                quidem perferendis!</p>
              <div className="ass1-section__image">
                <a href="single_post.html"><img src="images/microphone-1209816_1920.jpg" alt="" /></a>
              </div>
            </div>
            <div className="ass1-section__footer">
              <a href="/" className="ass1-section__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
              <a href="/" className="ass1-section__btn-downvote ass1-btn-icon"><i className="icon-Downvote" /></a>
              <a href="/" className="ass1-section__btn-like ass1-btn-icon"><i className="icon-Favorite_Full" /><span>1,274</span></a>
              <a href="/" className="ass1-section__btn-comment ass1-btn-icon"><i className="icon-Comment_Full" /><span>982</span></a>
            </div>
          </div>
        </div>
      </div>




    </div>
  )
}