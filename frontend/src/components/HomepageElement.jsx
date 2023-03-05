import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";

function HomepageElement(props) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  return (
    <div className="flex flex-col relative">
      <div className="z-10 rounded-lg bg-white p-3 shadow-lg mb-6">
        <div className="flex justify-between">
          <div className="self-center text-sm font-semibold text-gray-500">
            {props.name}
          </div>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="self-center text-sm font-semibold text-gray-500 cursor-pointer hover:bg-slate-100 py-1 px-2"
          >
            ...
          </button>
          <div
            ref={optionsRef}
            className={`self-center flex-col absolute top-0 right-0 bg-gray-50 z-20 shadow-md rounded-md translate-x-2 -translate-y-3 ${
              showOptions ? "" : "hidden"
            }`}
          >
            <div className="text-sm flex  items-center py-2 px-4 rounded-sm relative text-gray-800 cursor-pointer  hover:bg-slate-300">
              <Icon className="mr-2" icon="ic:baseline-edit" />
              Edit
            </div>
            <div className="text-sm flex  items-center py-2 px-4 rounded-sm relative text-red-500  cursor-pointer hover:bg-slate-300">
              <Icon
                className="mr-2"
                icon="ic:round-delete-forever"
                color="#c33"
              />
              Delete
            </div>
          </div>
        </div>
        <div className="my-3 text-2xl font-semibold">{props.data}</div>
      </div>
      <div className="absolute  rounded-lg bg-black pt-4 pb-1 px-3 text-sm text-green-400 bottom-0 right-3 ">
        {props.time}
      </div>
    </div>
  );
}

export default HomepageElement;
