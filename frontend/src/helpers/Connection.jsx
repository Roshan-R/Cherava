async function getDbDataFromDataId(id) {

  const res = await fetch("http://localhost:3000/getData/", {
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


