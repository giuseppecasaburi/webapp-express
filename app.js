// CONFIGURAZIONE EXPRESS
const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT;

// ROTTE
app.get("/", (req, res) => {
    res.send("Hello world by first route");
});


// PORTA IN ASCOLTO DEL SERVER
app.listen(port, () => {
    console.log("Hello world by server");
});