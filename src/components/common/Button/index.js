import classnames from 'classnames';

import LoadingIcon from '../Loading';


export default function Button({
  children,
  isLoading,
  type = 'button',
  variant,
  active,
  edit,
  disable,
  ...restProps
}) {

  const classNames = classnames('ass1-btn', {
    'load-more loadmore-btn': variant === 'loadmore',
    'btn btn-danger': variant === 'danger',
  })

  if (type === 'button') {
    return (
      < button type='button' className={classNames} {...restProps}>
        {isLoading && <LoadingIcon />}
        {children}
      </button >
    )
  }

  const classForModal = classnames('modal-btn', {
    'modal-btn-active': active === true,
    'save-change-for-editing': edit === true,
    'dth-btn-disable': disable === true,
  })

  if (type === 'modal-btn') {
    return (
      <div className={classForModal} {...restProps}>
        {isLoading && <LoadingIcon />}
        {children}
      </div>
    )
  }
}