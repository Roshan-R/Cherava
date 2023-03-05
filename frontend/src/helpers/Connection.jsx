async function getDbDataFromDataId(id) {

  const res = await fetch("https://cherava.roshanr3.repl.co/getData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id })
  })
  console.log(res)
  const json = await res.json();
  console.log('Json: ', json)
  return json;
}

export default getDbDataFromDataId;


