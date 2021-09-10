const mongoose = require("mongoose");

const Alunos = mongoose.model("alunos", {
    // const modelo (NOME PLURAL, INICIAL MAIÚSCULA) que permite MODELAR NOSSA COLLECTION ("NOME NA COLLECTION" - plural minúsculo , {ATRIBUTOS DA COLLECTION}
    nome: String,
    idade: Number,
    turma: String,
    sala: Number,
    contato: Number,
  });

  module.exports = Alunos;