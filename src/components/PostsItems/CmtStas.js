import { FacebookShareButton, FacebookIcon } from "react-share";


export default function CmtStas({
  children,
  handleClickCmt
}) {

  function handleClickFbShare(e) {
    e.preventDefault()
    console.log('e.target', e.target)
    let fbIcon = e.target.parentElement.nextElementSibling;
    fbIcon.click()
  }


  return (
    <div className="ass1-section__footer dth-footer-comment">
      <a href="/" className="ass1-section__btn-comment ass1-btn-icon" onClick={handleClickCmt}>
        <i className="fas fa-comment-alt"></i>
        <span>{children}</span>
      </a>

      <a href="/" className="ass1-section__btn-comment ass1-btn-icon" style={{ marginRight: '0px' }} onClick={handleClickFbShare}>
        <i className="fab fa-facebook-square dth-facebook-share" style={{ fontSize: '22px' }}>
          <span style={{ fontSize: '13px', fontFamily: '"Press Start 1P", cursive', marginLeft: '10px', pointerEvents: 'none' }}>Share to facebook</span>
        </i>
      </a>

      <FacebookShareButton
        url='www.youtube.com'
        quote='Tới Meme và cùng nhau quẩy nào các bạn ơi'
        hashtag='#QuẩyMeMeCùngReactJS'
      >
        <FacebookIcon className='dth-fb-share-icon' style={{ display: 'none' }} />
      </FacebookShareButton>

    </div >
  )
}