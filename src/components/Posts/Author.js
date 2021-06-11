import { Link } from 'react-router-dom'

export default function Author({
  children,
  userid,
  ...restProps
}) {
  const slugUserID = `user/${userid}`
  return (
    <Link to={slugUserID} className="ass1-section__name" >{children}</Link>
  )
}