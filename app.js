// CONFIGURAZIONE EXPRESS
const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT;

// IMPORTO IL ROUTER
const appRouters = require("./routers/appRouters") 

// MIDDLEWARE PER RENDERE ACCESSIBILE LA CARTELLA PUBBLIC
app.use(express.static("public"));

// ROTTE
app.use("/app", appRouters);


// PORTA IN ASCOLTO DEL SERVER
app.listen(port, () => {
    console.log("Hello world by server");
});