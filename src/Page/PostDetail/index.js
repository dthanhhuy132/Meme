export default funtion PostDetail() {
  return (
    <div className="container">
  {/*sections*/}
  <div className="row">
    <div className="col-lg-8">
      {/*section*/}
      <div className="ass1-section__list">
        <div className="ass1-section">
          <div className="ass1-section__head">
            <a href="#" className="ass1-section__avatar ass1-avatar"><img src="images/avatar-02.png" alt="" /></a>
            <div>
              <a href="#" className="ass1-section__name">Nguyễn Chính 9</a>
              <span className="ass1-section__passed">2 giờ trước</span>
            </div>
            <a href="#" className="ass1-section__link ass1-btn-icon"><i className="icon-Link" /></a>
          </div>
          <div className="ass1-section__content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas voluptates magnam,
              odit quae aut vel accusantium. Alias pariatur quidem, minus eaque officiis, sed ea
              repellendus tenetur ipsa inventore est earum.</p>
            <div className="ass1-section__image">
              <a href="#"><img src="images/microphone-1209816_1920.jpg" alt="" /></a>
            </div>
          </div>
          <div className="ass1-section__footer">
            <a href="#" className="ass1-section__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
            <a href="#" className="ass1-section__btn-downvote ass1-btn-icon"><i className="icon-Downvote" /></a>
            {/* <a href="#" class="ass1-section__btn-repost ass1-btn-icon"><i class="icon-Repost"></i></a> */}
            <a href="#" className="ass1-section__btn-like ass1-btn-icon"><i className="icon-Favorite_Full" /><span>1,274</span></a>
            <a href="#" className="ass1-section__btn-comment ass1-btn-icon"><i className="icon-Comment_Full" /><span>982</span></a>
          </div>
          <div className="ass1-section__feeling">
            <div className="ass1-feeling">
              <a href="#" rel="tooltip" data-original-title="Happy"><img src="fonts/emotion/svg/Happy.svg" alt="" /><span>126</span></a>
              <a href="#" rel="tooltip" data-original-title="Lol"><img src="fonts/emotion/svg/LOL.svg" alt="" /><span>256</span></a>
              <a href="#" rel="tooltip" data-original-title="Surprised"><img src="fonts/emotion/svg/Surprised.svg" alt="" /><span>741</span></a>
              <a href="#" rel="tooltip" data-original-title="Sad"><img src="fonts/emotion/svg/Sad.svg" alt="" /><span>2K</span></a>
              <a href="#" rel="tooltip" data-original-title="Tongue Out"><img src="fonts/emotion/svg/Tongue_Out.svg" alt="" /><span>245</span></a>
              <a href="#" rel="tooltip" data-original-title="No words"><img src="fonts/emotion/svg/No_words.svg" alt="" /><span>237</span></a>
              <a href="#" rel="tooltip" data-original-title="Love"><img src="fonts/emotion/svg/Love.svg" alt="" /><span>1,236</span></a>
              <a href="#" rel="tooltip" data-original-title="Blushing"><img src="fonts/emotion/svg/Blushing.svg" alt="" /><span>365</span></a>
              <a href="#" rel="tooltip" data-original-title="Cool"><img src="fonts/emotion/svg/Cool.svg" alt="" /><span>412</span></a>
              <a href="#" rel="tooltip" data-original-title="Angry"><img src="fonts/emotion/svg/Angry.svg" alt="" /><span>478</span></a>
            </div>
          </div>
        </div>
        <div className="ass1-add-comment">
          <form action="#">
            <input type="text" className="form-control ttg-border-none" placeholder="Thêm một bình luận" />
          </form>
          <div className="ass1-add-comment__content">
            <a href="#" className="ass1-add-comment__btn-save ass1-btn-icon"><span>180</span><i className="icon-Submit_Tick" /></a>
          </div>
        </div>
        <div className="ass1-comments">
          <div className="ass1-comments__head">
            <div className="ass1-comments__title">214 Bình luận</div>
            <div className="ass1-comments__options">
              <span>Sắp xếp theo:</span>
              <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
              <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /></a>
              <a href="#" className="ass1-comments__btn-expand ass1-btn-icon"><i className="icon-Expand_all" /></a>
            </div>
          </div>
          {/*comment*/}
          <div className="ass1-comments__section">
            <a href="#" className="ass1-comments__avatar ass1-avatar"><img src="images/avatar-02.png" alt="" /></a>
            <div className="ass1-comments__content">
              <a href="#" className="ass1-comments__name">Tây Tạng</a>
              <span className="ass1-comments__passed">12 giờ trước</span>
              <p>Scratch off globe, for when you want to wipe out any country that displeases you
                but lack the weaponry to do so.</p>
              <div className="ass1-comments__info">
                <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /><span>901</span></a>
                <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /><span>36</span></a>
              </div>
            </div>
          </div>
          {/*comment*/}
          <div className="ass1-comments__section">
            <a href="#" className="ass1-comments__avatar ass1-avatar"><img src="images/avatar-11.png" alt="" /></a>
            <div className="ass1-comments__content">
              <a href="#" className="ass1-comments__name">Monster </a>
              <span className="ass1-comments__passed">3 giờ trước</span>
              <a href="#" className="ass1-comments__btn-reply ass1-btn-icon"><i className="icon-Reply">Trả
                  lời</i></a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolores
                officiis, ducimus veritatis voluptatibus alias quos, magnam sed non quo hic
                mollitia perferendis nostrum? Commodi reprehenderit nesciunt saepe, libero et.
              </p>
              <div className="ass1-comments__info">
                <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /><span>901</span></a>
                <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /><span>36</span></a>
                <a href="#" className="ass1-comments__btn-flag ass1-btn-icon"><i className="icon-Flag" /></a>
              </div>
              {/*comment*/}
              <div className="ass1-comments__section">
                <a href="#" className="ass1-comments__avatar ass1-avatar"><img src="images/avatar-10.png" alt="" /></a>
                <div className="ass1-comments__content">
                  <a href="#" className="ass1-comments__name">Bầu trời</a>
                  <span className="ass1-comments__passed">1 hour ago</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim debitis
                    cumque nostrum blanditiis iusto amet illo necessitatibus, ea quibusdam
                    quidem quod, doloribus, voluptatem est saepe nulla ex optio ut quas.</p>
                  <div className="ass1-comments__info">
                    <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /><span>901</span></a>
                    <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /><span>36</span></a>
                  </div>
                </div>
              </div>
              {/*comment*/}
              <div className="ass1-comments__section">
                <a href="#" className="ass1-comments__avatar ass1-avatar"><img src="images/avatar-10.png" alt="" /></a>
                <div className="ass1-comments__content">
                  <a href="#" className="ass1-comments__name">Nguyễn A</a>
                  <span className="ass1-comments__passed">39 mins ago</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
                    voluptatibus distinctio possimus qui, incidunt illum nesciunt ad! Cum
                    hic pariatur, velit, dignissimos ratione necessitatibus natus neque sed
                    esse, voluptatum ipsum.</p>
                  <div className="ass1-comments__info">
                    <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /><span>256</span></a>
                    <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /><span>12</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*comment*/}
          <div className="ass1-comments__section">
            <a href="#" className="ass1-comments__avatar ass1-avatar"><img src="images/avatar-14.png" alt="" /></a>
            <div className="ass1-comments__content">
              <a href="#" className="ass1-comments__name">Minh Minh</a>
              <span className="ass1-comments__passed">2 giờ trước</span>
              <p>Do not cook on the colorful fire!!! It is copper and will kill you if you use for
                cooking!!!</p>
              <div className="ass1-comments__info">
                <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /><span>543</span></a>
                <a href="#" className="ass1-comments__btn-down ass1-btn-icon"><i className="icon-Downvote" /><span>21</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-4">
      <aside className="ass1-aside">
        <div className="ass1-content-head__t">
          <div>Bài viết gần đây.</div>
        </div>
        <div className="ass1-section">
          <div className="ass1-section__head">
            <a href="#" className="ass1-section__avatar ass1-avatar"><img src="images/avatar-03.png" alt="" /></a>
            <div>
              <a href="#" className="ass1-section__name">Trần Văn A</a>
              <span className="ass1-section__passed">20 phút trước</span>
            </div>
            {/* <a href="#" class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></a> */}
          </div>
          <div className="ass1-section__content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum tempore recusandae,
              nemo consequuntur rem pariatur ducimus dolorem aperiam nesciunt dolore, ratione aut,
              corporis laborum? Numquam ad magnam consectetur labore quam?</p>
          </div>
          <div className="ass1-section__footer">
            <a href="#" className="ass1-section__btn-upvote ass1-btn-icon"><i className="icon-Upvote" /></a>
            <a href="#" className="ass1-section__btn-downvote ass1-btn-icon"><i className="icon-Downvote" /></a>
            {/* <a href="#" class="ass1-section__btn-repost ass1-btn-icon"><i class="icon-Repost"></i></a> */}
            <a href="#" className="ass1-section__btn-like ass1-btn-icon"><i className="icon-Favorite_Full" /><span>1,274</span></a>
            <a href="#" className="ass1-section__btn-comment ass1-btn-icon"><i className="icon-Comment_Full" /><span>982</span></a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</div>

  )
}