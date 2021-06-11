

export default function Input({
  type = 'text',
  placeholder,
  ...restProps
}) {
  return (
    <input
      className="form-control"
      type={type}
      placeholder={placeholder}
      {...restProps}
    />
  )
}
