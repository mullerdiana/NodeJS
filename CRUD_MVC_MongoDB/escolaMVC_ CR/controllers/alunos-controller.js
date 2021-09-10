const alunos_bd = require("../models/alunos-model");

// READ
exports.listar_alunos = (req, res) => {
  alunos_bd.find({}, (err, aluno) => {
    if (err) 
      return res.status(500).send("Erro ao listar!");
    res.render("views/pages/alunos", { resultado: aluno });
  });
};

// CREATE
exports.cadastrar_alunos_get = (req, res)=>{
  res.render("views/pages/formAlunos");
};

exports.cadastrar_alunos_post = (req, res)=>{
  let incluir_registro = new alunos_bd();

  incluir_registro.nome = req.body.nome; // .model = .name
  incluir_registro.idade = req.body.idade;
  incluir_registro.turma = req.body.turma;
  incluir_registro.sala = req.body.sala;
  incluir_registro.contato = req.body.contato;

  incluir_registro.save((err)=>{
    if (err) 
      return res.satus(500).send("Erro ao cadastrar");
    return res.redirect("/alunos");
  });
};