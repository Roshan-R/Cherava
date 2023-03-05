import { useEffect } from "react";

function Preview(props) {

  useEffect(() => {
    var wrapper = document.getElementById("preview");
    wrapper.innerHTML = props.data;
  })

  return (
    <div id="preview" className="flex p-3 flex-1 bg-slate-200 rounded-md">
    </div>
  );

}

export default Preview;
