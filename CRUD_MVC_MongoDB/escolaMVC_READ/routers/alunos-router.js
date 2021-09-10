//IMPORTS
const express = require("express");
const router = express.Router(); //chamar a função específica do express que trabalha com rotas

const studentController = require("../controllers/alunos-controller");

router.get("/", studentController.listar_alunos); //chamando a função específica do controller que irá trabalhar com a rota principal desse sistema, que é a rota de listagem


module.exports = router;