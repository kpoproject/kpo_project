import { assert } from "../../assert.js";

const host = process.env.HOST;

const response = await fetch(host + "register", {
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
console.assert(response.success, "register");

let response2 = await fetch(host + "login", {
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
console.assert(response2.success, "login");

response2 = await fetch(host + "lib/addbook", {
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
console.assert(response2.success, "addbook");

response2 = await fetch(host + "lib/addbook", {
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
console.assert(response2.success, "addbook2");

response2 = await fetch(host + "lib", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
    query: "",
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);
console.assert(response2.success, "lib");

response2 = await fetch(host + "lib/removebook", {
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
console.assert(response2.success, "removebook");

response2 = await fetch(host + "lib", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userid: user.userid,
    password: user.password,
    query: "",
  }),
}).then((response) => {
  return response.json();
});
console.log(response2);
console.assert(response2.success, "lib2");

response2 = await fetch(host + "lib/removebook", {
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
console.assert(response2.success, "removebook2");

let response3 = await fetch(host + "deleteuser", {
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
console.log(response3);
assert(response2.success, "deleteuser");

console.log("TEST COMPLETED");
