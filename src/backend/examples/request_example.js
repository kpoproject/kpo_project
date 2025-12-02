const response = await fetch("http://localhost:8080/register", {
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
console.log(response);

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

response2 = await fetch("http://localhost:8080/lib/addbook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
    cover_i: 11,
    first_year_publish: 2004,
    key: "/works/OL8065988M",
    language: ["jpn", "krn"],
    title: "the lord of the rings",
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
    cover_i: 11,
    first_year_publish: 2004,
    key: "/works/OL8066000M",
    language: ["jpn", "krn"],
    title: "the lord of the rings",
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

// NOTE: search HERE
response2 = await fetch("http://localhost:8080/search", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    api: "https://openlibrary.org/search.json",
    query: "the lord of the rings",
    userid: user.userid,
    password: user.password,
  }),
}).then((response) => {
  return response.json();
});
console.log(response2.api_response);

response2 = await fetch("http://localhost:8080/lib/removebook", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
    key: "/works/OL8065988M",
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
    key: "/works/OL8066000M",
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);

response2 = await fetch("http://localhost:8080/deleteuser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    username: user.username,
    password: user.password,
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);
