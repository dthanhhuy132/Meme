import { useEffect, useState } from "react"
import classNames from 'classnames'
export default function Input({
  placeholder,
  type = 'text',
  ...restProps
}) {
  const [localType, setLocalType] = useState('')
  useEffect(() => {
    setLocalType(type)
  }, [type])



  function handleTogglePass() {
    if (localType === 'password') setLocalType('text')
    else setLocalType('password')

  }

  let iconPassword = classNames('far dth-fa-password', {
    'fa-eye': localType === 'password',
    'fa-eye-slash': localType === 'text',
  })

  return (
    <>
      <div className='form-control-wrapper'>
        <input
          className="form-control"
          type={localType}
          placeholder={placeholder}
          {...restProps}
        />
        {type === 'password'
          && <i className={iconPassword} onClick={handleTogglePass} />
        }

      </div>

    </>
  )
}
