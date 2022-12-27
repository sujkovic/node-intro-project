const fs = require("fs");
const path = require("path");
const http = require("http");

http
  .createServer((req, res) => {
    //    Create file name
    let filepath = path.join(
      __dirname,
      req.url == "/" ? "index.html" : req.url
    );
    console.log(filepath);

    let extname = path.extname(filepath);
    let contentType = "text/html";

    switch (extname) {
      case "js":
        contentType = "text/javascript";
        break;
    }

    fs.readFile(filepath, (err, data) => {
      if (err) {
        fs.readFile(path.join(__dirname, "404.html"), "utf8", (err2, data2) => {
          //	Big L
          if (err2) {
            console.log("404.html must be broken");
            res.writeHead(500);
            res.end(`server error: ${err2}`);
          }
          //	404 page
          console.log("404 file not found");
          res.writeHead(200, { "Content-type": "text/html" });
          res.end(data2, "utf8");
        });
      } else {
        //	Big W
        console.log(`Successfully loaded ${filepath}`);
        res.writeHead(200, { "Content-type": contentType });
        res.end(data, "utf8");
      }
    });
  })
  .listen(8080, () => {
    console.log("Server running on port 8080...");
  });
