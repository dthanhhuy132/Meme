import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Avatar({
  AvatarURL,
  userid
}) {
  const currentUser = useSelector(state => state.Auth.currentUser);
  const userProfile = currentUser?.USERID

  const avatarDefault = 'https://www.katacoda.com/phwes/avatar'
  let avatar = AvatarURL || avatarDefault
  const slugUserID = userProfile === userid ? '/profile' : `/user/${userid}`

  return (
    <Link to={slugUserID} className="ass1-section__avatar ass1-avatar"><img src={avatar} alt="" /></Link>
  )
}