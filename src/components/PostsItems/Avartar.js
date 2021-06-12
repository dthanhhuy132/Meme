export default function Avatar({
  AvatarURL,
}) {
  const avatarDefault = 'https://www.katacoda.com/phwes/avatar'
  let avatar = AvatarURL || avatarDefault

  return (
    <a href="bai-viet-chi-tiet.html" className="ass1-section__avatar ass1-avatar"><img src={avatar} alt="" /></a>
  )
}