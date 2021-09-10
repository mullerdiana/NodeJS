const alunos_bd = require("../models/alunos-model");

exports.listar_alunos = (req, res) => {
  alunos_bd.find({}, (err, aluno) => {
    if (err) 
      return res.status(500).send("Erro ao listar!");
    res.render("views/pages/alunos", { resultado: aluno });
  });
};


// exports.listar_alunos = (req, res)=>{
//   res.render("views/pages/alunos.ejs");
// }