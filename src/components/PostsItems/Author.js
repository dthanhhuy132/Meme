import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Author({
  children,
  userid,
  ...restProps
}) {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const userProfile = currentUser?.USERID

  const slugUserID = userProfile === userid ? '/profile' : `/user/${userid}`

  return (
    <Link to={slugUserID} className="ass1-section__name" > {children}</Link >
  )
}