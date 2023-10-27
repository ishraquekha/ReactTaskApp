// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((err, req, res, next) => {
  next();
});

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  if (res.statusCode === 200 || res.statusCode === 201)
    res.jsonp({
      body: req.method !== "DELETE" ? res.locals.data : undefined,
      message:
        req.method === "DELETE"
          ? "Deletion succcessful"
          : req.method === "POST"
          ? "Creation succcessful"
          : "Update succcessful",
      status: true,
    });
  else
    res.status(500).jsonp({
      error: "Something went wrong",
      status: false,
    });
};

server.use(
  jsonServer.rewriter({
    "/api/v1/*": "/$1",
  })
);

server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running 🏃‍♂️ 🏃‍♂️ 🏃‍♂️ at port: 4000");
});
