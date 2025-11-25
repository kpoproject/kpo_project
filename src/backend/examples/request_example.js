// const response = await fetch("http://localhost:8080/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     username: "s",
//     password: "a",
//   }),
// }).then((response) => {
//   return response.json();
// });
// console.log(response);
//
// const response1 = await fetch("http://localhost:8080/lib", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     userid: 6,
//   }),
// }).then((response) => {
//   return response.json();
// });
// console.log(response1);
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
console.log(response2.api_response);
