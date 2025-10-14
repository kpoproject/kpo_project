const response = await fetch("http://localhost:8080/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    api: "https://openlibrary.org/search.json",
    // query: "",
  }),
}).then((response) => {
  return response.json();
});
console.log(response);

const response2 = await fetch("http://localhost:8080/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    api: "https://openlibrary.org/search.json",
    query: "the lord of the rings",
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);
