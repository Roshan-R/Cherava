function HomepageElement(props) {
  return (
    <div className="flex flex-col relative">
      <div className="z-10 rounded-lg bg-white p-3 shadow-lg mb-6">
        <div className="flex justify-between">
          <div className="self-center text-sm font-semibold text-gray-500">{props.name}</div>
          <button className="self-center text-sm font-semibold text-gray-500">...</button>
        </div>
        <div className="my-3 text-2xl font-semibold">{props.data}</div>
      </div>
      <div className="absolute  rounded-lg bg-black pt-4 pb-1 px-3 text-sm text-green-400 bottom-0 right-3 ">{props.time}</div>
    </div>
  );
}

export default HomepageElement;
