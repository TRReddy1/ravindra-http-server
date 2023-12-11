const { error } = require("console");
const http = require("http");
const uids = require("uuid");

const server = http.createServer((req, res) => {
  //Should return the following HTML content. Note when opened in the browser it should display the HTML page and not the HTML code.
  if (req.method === "GET" && req.url === "/html") {
    res.end(`<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
          <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
          <p> - Martin Fowler</p>
    
      </body>
    </html>`);
  }

  // Should return the following JSON string
  if (req.method === "GET" && req.url === "/json") {
    res.end(`{
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
  }

  //Should return a UUID4.

  if (req.method === "GET" && req.url === "/uuid") {
    res.end(uids.v4());
  }

  //Should return a response with a status code as specified in the request.
  const statusCodes = [100, 200, 300, 400, 500];
  const hasCode = statusCodes.find((code) => {
    return req.method === "GET" && req.url === `/status/${code}`;
  });
  //console.log(hasCode);
  if (hasCode) {
    res.statusCode = hasCode;
    res.end(JSON.stringify({ statusCode: hasCode }));
  }

  // Should return a success response but after the specified delay in the request.
  if (req.method === "GET" && req.url.startsWith("/delay/")) {
    const delayTime = parseInt(req.url.split("/delay/")[1]);

    console.log(delayTime);

    setTimeout(() => {
      res.end("success");
    }, delayTime * 1000);
  }
});

const PORT = 3000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
