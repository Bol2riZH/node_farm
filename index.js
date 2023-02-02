"use strict";
const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////////
// FILES

//Blocking synchronous way
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
console.log(textOut);
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");
*/

//Non-blocking asynchronous way
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("Will read file");
*/

/////////////////////////////////
// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview")
    res.end("This is the OVERVIEW");
  if (pathName === "/product") res.end("This is the PRODUCT");
  if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
