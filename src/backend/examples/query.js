const response = await fetch("http://localhost:3030/" + "lib", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: 559,
    password: "g",
    query: "some random",
  }),
}).then((response) => {
  return response.json();
});
console.log(response);
