const express = require("express");
const app = express();
const port = 3000;

const loggingMiddleware = (req, res, next) => {
    console.log(`Middleware completed at ${new Date()}`)
    res.setHeader("X-Codaisseur-Time", new Date() )
    next()
}

const failRandomlyMiddleware = (req, res, next) => {
    const number = Math.random()
    if(number < 0.5){
        next()
    } else {
        res.status(500).send("No content")
    }
}

app.use(loggingMiddleware)

app.get("/", failRandomlyMiddleware, (req, res) => res.send("Hello"));

app.get("/foo", (req, res) => res.send("Foo Doo Two You"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));