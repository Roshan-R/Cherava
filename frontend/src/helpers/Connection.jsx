async function getDbDataFromDataId(id) {

  const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/`, {
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


