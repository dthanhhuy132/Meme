export default function CmtStas({
  children
}) {
  return (
    <div className="ass1-section__footer">
      <a href="/" className="ass1-section__btn-comment ass1-btn-icon">
        <i className="fas fa-comment-alt"></i>
        <span>{children}</span>
      </a>
    </div>
  )
}