import LoadingIcon from '../Loading';
import classnames from 'classnames';


export default function Button({
  children,
  isLoading,
  type = 'button',
  variant,
  ...restProps
}) {

  const classNames = classnames('ass1-btn', {
    'load-more loadmore-btn': variant === 'loadmore'
  })

  if (type === 'button') {
    return (
      < button type='button' className={classNames} {...restProps}>
        { isLoading && <LoadingIcon />}
        { children}
      </button >
    )
  }
}