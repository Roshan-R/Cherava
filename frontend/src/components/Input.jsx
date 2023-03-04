function Input(props) {
  return (
    <>
      <label className="block mb-2 text-lg font-semibold text-gray-600">{props.title}</label>
      <input defaultValue={props.defaultValue} placeholder={props.placeholder} onChange={props.onChange} type="{props.type}" id="input-label" className="block mb-4 w-full rounded-md bg-gray-200 p-2 text-sm font-semibold" />
    </>
  )
}

export default Input;
