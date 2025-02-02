// CONFIGURAZIONE EXPRESS
const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT;
const cors = require("cors");

// IMPORTO IL ROUTER
const appRouters = require("./routers/appRouters") 

// IMPORTO CORS PER POTER PERMETTERE IL COLLEGAMENTO CON LE CHIAMATE NEL FE
app.use(cors());

// MIDDLEWARE PER RENDERE ACCESSIBILE LA CARTELLA PUBBLIC
app.use(express.static("public"));

// ROTTE
app.use("/app", appRouters);


// PORTA IN ASCOLTO DEL SERVER
app.listen(port, () => {
    console.log("Hello world by server");
});