export default function Upload() {
  return (
    <main>
      <div className="container">
        {/*sections*/}
        <div className="row">
          <div className="col-lg-8">
            {/*section*/}
            <div className="ass1-section ass1-section__edit-post">
              <div className="ass1-section__content">
                <form action="#">
                  <div className="form-group">
                    <input type="text" className="form-control ttg-border-none" placeholder="https://" />
                  </div>
                  <div className="form-group">
                    <textarea type="text" className="form-control ttg-border-none" placeholder="Mô tả ..." defaultValue={""} />
                  </div>
                </form>
                <div className="ass1-section__image">
                  <a href="/"><img src="images/no_image_available.jpg" alt="default" /></a>
                </div>
                <a href="https://memeful.com/" className="ass1-btn ass1-btn-meme">Chế ảnh từ meme</a>
                <a href="/" className="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <aside className="ass1-aside ass1-aside__edit-post">
              <div>
                <a href="/" className="ass1-btn">Đăng bài</a>
              </div>
              <div className="ass1-aside__edit-post-head">
                <span style={{ display: 'block', width: '100%', marginBottom: '10px' }}>Chọn danh mục</span>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" defaultChecked="checked" />
                  <span />
                  <p>Ảnh troll</p>
                </label>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" />
                  <span />
                  <p>FapTV</p>
                </label>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" defaultChecked="checked" />
                  <span />
                  <p>Ảnh troll</p>
                </label>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" />
                  <span />
                  <p>FapTV</p>
                </label>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" defaultChecked="checked" />
                  <span />
                  <p>Ảnh troll</p>
                </label>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" />
                  <span />
                  <p>FapTV</p>
                </label>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" defaultChecked="checked" />
                  <span />
                  <p>Ảnh troll</p>
                </label>
                <label className="ass1-checkbox">
                  <input type="radio" name="state-post" />
                  <span />
                  <p>FapTV</p>
                </label>
              </div>
              <div className="ass1-aside__get-code">
                <p>Share Link</p>
              </div>
              <div className="ass1-aside__social">
                <a href="/" className="ass1-btn-social__facebook ass1-btn-social"><i className="fa fa-facebook" /></a>
                <a href="/" className="ass1-btn-social__twitter ass1-btn-social"><i className="fa fa-twitter" /></a>
                <a href="/" className="ass1-btn-social__google ass1-btn-social"><i className="fa fa-google-plus" /></a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}