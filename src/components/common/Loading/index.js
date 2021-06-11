import loadingIcon from './LoadingIcon.gif'

export default function LoadingIcon() {
  return (
    <img className='loading-icon' src={loadingIcon} alt='loading...' style={{ 'width': '25px' }}></img>
  )
}
