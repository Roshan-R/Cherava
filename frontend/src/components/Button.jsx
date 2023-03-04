function Button(props) {
  return (
    <button onClick={props.onClick} type="button" className="my-4 inline-flex w-1/6 items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600">
      {props.isLoading ? <span className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white" role="status" aria-label="loading"></span> : <></>}
      {props.text}
    </button>
  );

}

export default Button;
