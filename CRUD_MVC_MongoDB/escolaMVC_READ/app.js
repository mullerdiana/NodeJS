// IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;

// CONNECTION
const database =
  "mongodb+srv://diana_muller:diana_muller@cluster0.gzmky.mongodb.net/escola?retryWrites=true&w=majority";
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true });

//VIEW
app.set("view engine", "ejs");
app.set("views", __dirname, "/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ROTA PRINCIPAL DA NOSSA APLICAÇÃO
app.get('/', (req, res) => {
    res.send("Página Inicial")
});

//ROTA ALUNOS
const student_router = require("./routers/alunos-router")

app.use("/alunos", student_router);



app.listen(port, () => {
  console.log(`Servidor rodando na ${port}`);
});
