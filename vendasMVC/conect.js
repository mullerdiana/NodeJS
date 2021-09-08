var mongoose = require('mongoose'); //IMPORTANDO MONGOOSE PRA NOSSA APLIACAÇÃO
mongoose.connect("mongodb+srv://diana_muller:diana_muller@cluster0.gzmky.mongodb.net/vendas?retryWrites=true&w=majority").then(()=>{   //verificar se deu certo. 
    console.log("banco conectado!");
}).catch((err)=>{ //como parametro da função traz o erro
    console.log('Deu ruim' + err);
}); 