const Tarefa = require("../models/tarefa");//
let message = "";
let type = "";


const getAll = async (req, res) => {
    try{
        const tarefa = await Tarefa.findAll();//aguardando
        res.render("index",{
            tarefa,
            tarefaPut: null,
            tarefaDel: null,
            message,
            type,
        });
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};


const getById = async (req,res) => {
    try{
        const tarefa = await Tarefa.findByPk(req.params.id);
        res.render("detalhes", {
            tarefa
        });
    }catch(err){
        res.status(500).send({err: err.message});
    };
};


const criar = (req, res ) => {
    try{
        res.render("criar", {message, type});
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};

const criacao  = async (req,res) =>{
    try{
        const tarefa = req.body;
        if(
            !tarefa.nome ||
            !tarefa.detalhes
        ){
            message = "Preencha todos os campos para cadastro!"
            type = "danger";
            return res.redirect("/criar");
        }
        await Tarefa.create(tarefa);
        res.redirect("/");
    }catch(err){
        res.status(500).send({err: err.message});
    };
};


const editar1 = async (req,res) => {
    const tarefa = await Tarefa.findByPk(req.params.id);

    if(!tarefa){
        res.render("editar", {
            message: "tarefa não encontrado!",
            type: "danger"
        });
    }
    res.render("editar",{
        tarefa,
        message:"Editado com sucesso",
        type: "success"
    });
};


const editar = async (req,res) => {
    try{
        const tarefa = await Tarefa.findByPk(req.params.id);
        const {nome, detalhes } = req.body;

        tarefa.nome = nome;
        tarefa.detalhes = detalhes;
        

        const tarefaEditada = await tarefa.save();
       
        res.redirect("/");
    }catch(err){
        res.status(500).send({err: err.message});
    };
};


const deletar = async (req, res) =>{
    try{
       await Tarefa.destroy({where:{id: req.params.id}});
       message = "Tarefa removida com sucesso!"
       res.redirect("/");
   
   
    } catch (err) {
       res.status(500).send({ err: err.message });
     }
   
   
   }

module.exports = {
    getAll,
    getById,
    criar,
    criacao,
    editar1,
    editar,
    deletar,
}