// *****CAHAMADAS DE MÓDULO*****
const express = require("express"); //CHAMAR PRA NOSSA APLICAÇÃO O MODULO EXPRESS
const app = express(); //GUARDANDO O OBJETO EXPRESS NA aplicação APP do express
const mongoose = require("mongoose"); //IMPORTANDO MONGOOSE PARA NOSSA APLICAÇÃO - usado para realizar a modelagem do banco
const port = 3000; //definindo a porta

// *****PRIMEIRO(PQ NA ROTA PRINCIPAL JÁ PODE SER POSSÍVEL QUE SEJA NECESSÁRIO INFORMAÇÕES DELE): FAZER A CONEXÃO COM O BANCO DE DADOS COM O USO DE FLAGS QUE EVITAM A DEPRECIAÇÃO DO CÓDIGO *****
mongoose.connect(
  "mongodb+srv://diana_muller:diana_muller@cluster0.gzmky.mongodb.net/vendas?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
); //FLAGS QUE SERVEM PARA EVITAR ERROS DE DEPRECIAÇÃO

// *****CRIANDO O MODEL QUE IRÁ COMPOR A COLLECTION NO BANCO - ATRIBUIÇÕES QUE VAMOS TER NA NOSSA COLLECTION*****
const Produtos = mongoose.model("produtos", {
  //PERMITE QUE A GENTE MODELE NOSSA COLLECTION ("NOME NA COLLECTION"){ATRIBUTOS DA COLLECTION}
  nome: String,
  vlUnit: String,
  codigoBarras: String,
});

// ANTES DAS ROTAS PRECISAMOS DEFINIR O MOTOR DE *****VISUALIZAÇÃO*****
app.set("view engine", "ejs"); //MOTOR DE VISUALIZAÇÃO SERÁ O EJS
app.set("views", __dirname, "/views"); // AS NOSSAS VISUALIZAÇÕES

//PERMITIR QUE OS DADOS PASSEM DE UMA PÁGINA PARA OUTRA, QUE ELAS INTERAJAM
app.use(express.urlencoded({ extended: true })); //Determinar que os dados possam circular entre as páginas
app.use(express.json()); //DEFININDO QUE O FLUXO DE ARQUIVOS SERÁ EM FORMATO JSON QUE É MAIS LEVE.

//*****CRIAÇÃO DAS ROTAS*****
// *****ROTA PRINCIPAL*****
app.get("/", (req, res) => {
  console.log(req.ip);
  res.send("Página inicial"); //ENVIAR A SEGUINTE MENSAGEM
});

// *****ROTA PARA LISTAR PRODUTOS CADASTRADOS*****
app.get("/produtos", (req, res) => {
  let consulta = Produtos.find({}, (err, produto) => {
    //A VARIAVEL produtos recebe OS MODELOS DA CONSULTA DOS DADOS CADASTRADOS para trazer os dados do banco {}= SEM NENHUMA ESPECIFICAÇÃO, trazer todos
    console.log(consulta);
    if (err)
      //verificando se houve erro na consulta
      return res.status(500).send("Erro ao consultar produto");
    res.render("produtos", { produto_itens: produto }); // a resposta vai ser uma renderização na pagina produtos.ejs variável:resultado da consulta feita
  });
});

//rota para renderizar para a página formprodutos.ejs
app.get("/cadastrarProdutos", (req, res) => {
  res.render("formprodutos"); //como parametro a página ejs que criamos
});

// GUARDAR OS PRODUTOS CADASTRADOS - metodo post para salvar produtos no BD
app.post("/cadastrarProdutos", (req, res) => {
  // POST COM PARAMETRO QUAL A ROTA USADA PARA ARMAZENAR NO BANCO DE DADOS
  let produto = new Produtos(); //CRIANDO A VARIAVEL PRODUTO QUE RECEBE O OBJETO Produtos QUE FORAM INSTANCIADOS NO MODEL DA COLLECTION
  produto.nome = req.body.nome; //
  produto.vlUnit = req.body.valor;
  produto.codigoBarras = req.body.codBarras; //pegando os atributos names dos inputs
  produto.save((err) => {
    //salvando a informação no banco de dados
    if (err) return res.status(500).send("Erro ao cadastrar"); //verificando se houve erro no servidor
    return res.redirect("/produtos"); //redirecionamento automático para a tela de produtos caso a info tenha sido salva corretamente
  });
});

//ROTA PARA Excluir
app.get("/deletarProduto/:id", (req, res) => {
  var id = req.params.id; //pegando a id do parâmetro
  Produtos.deleteOne({ _id: id }, (err, result) => {
    if (err) 
      return res.status(500).send("Erro ao excluir registro");
    // exibir novamente a lista
  });
  res.redirect("/produtos");
});

//Rota para trazer os elementos preenchidos - buscar o elemento
app.get("/editarProduto/:id", (req, res)=>{
  Produtos.findById(req.params.id, (err, produto)=>{
    if(err) 
      return res.status(500).send('Erro ao consultar produto');
    res.render("formEditarproduto", {produto_item:produto})  
  });
});

// quando clicar em editar no ejs vem pra essa rota
app.post("/editarProduto", (req,res)=>{
  var id = req.body.id;  //vamos precisar sa
  Produtos.findById(id,(err, produto)=>{
    if(err)
      return res.status(500).send('Erro ao consultar produto');
    produto.nome = req.body.nome;
    produto.vlUnit = req.body.valor;
    produto.codigoBarras = req.body.codBarras;

    produto.save(err =>{
      if(err)
        return res.status(500).send('Erro ao editar produto');
      return res.redirect('/produtos');
    })
  })
})


// rota de pesquisa
app.get("/pesquisar", (req,res)=>{ //name do campo input pesquisa
  
  var busca = req.query.pesquisa;
  // console.log(busca);
  Produtos.find({$or:[{nome:busca},{vlUnit:busca},{codigoBarras: busca}]}, (err, produto) => {
    if (err)
      return res.status(500).send("Erro ao consultar produto");
    res.render("produtos", { produto_itens: produto }); // a resposta vai ser uma renderização na pagina produtos.ejs variável:resultado da consulta feita
  });
})

//*****PORTA DE ESCUTA*****
app.listen(port, () => {
  //QUAL A PORTA em QUE A APLICAÇÃO ESTÁ
  console.log(`Servidor rodando na porta ${port}`);
});
