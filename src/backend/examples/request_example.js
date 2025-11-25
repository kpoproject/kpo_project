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

let response2 = await fetch("http://localhost:8080/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "s",
    password: "a",
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);
let user = Object(response2);
console.log(user);
// response2 = await fetch("http://localhost:8080/search", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     api: "https://openlibrary.org/search.json",
//     query: "the lord of the rings",
//   }),
// }).then((response) => {
//   return response.json();
// });
// console.log(response2.api_response);

response2 = await fetch("http://localhost:8080/lib/addbook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
    bookid: 1,
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);

response2 = await fetch("http://localhost:8080/lib/addbook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
    bookid: 2,
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);

response2 = await fetch("http://localhost:8080/lib", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);

response2 = await fetch("http://localhost:8080/lib/removebook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
    bookid: 2,
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);

response2 = await fetch("http://localhost:8080/lib", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);
