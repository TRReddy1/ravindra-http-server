const express = require("express");
const uuid = require("uuid");

//starting express
const app = express();

//Should return the following HTML content.
app.get("/html", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
        <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
        <p> - Martin Fowler</p>
    </body>
  </html>`);
});

// Should return the following JSON string
app.get("/json", (req, res) => {
  res.json(`{
        "slideshow": {
          "author": "Yours Truly",
          "date": "date of publication",
          "slides": [
            {
              "title": "Wake up to WonderWidgets!",
              "type": "all"
            },
            {
              "items": [
                "Why <em>WonderWidgets</em> are great",
                "Who <em>buys</em> WonderWidgets"
              ],
              "title": "Overview",
              "type": "all"
            }
          ],
          "title": "Sample Slide Show"
        }
      }`);
});

//Should return a UUID4.
app.get("/uuid", (req, res) => {
  res.json(uuid.v4());
});

//Should return a response with a status code as specified in the request.
app.get("/status/:code", (req, res) => {
  const statuscode = parseInt(req.params.code);
  const statuscodes = [100, 200, 300, 400, 500];

  // const hasCode = statuscodes.find((code) => code === statuscode);

  if (statuscodes.includes(statuscode)) {
    res.status(statuscode).json({ statuscode: statuscode });
  } else {
    res.status(404).json({ error: "status code not matched" });
  }
});

// Should return a success response but after the specified delay in the request.
app.get("/delay/:sec", (req, res) => {
  const sec = parseInt(req.params.sec);

  setTimeout(() => {
    res.json("successfully got response!");
  }, sec * 1000);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server started at port : ${PORT}`);
});
