const routes = require("express").Router();//nativo do express, caminho que ele será executado em routes
const tarefaControllers = require("../controllers/tarefaControllers");

routes.get("/", tarefaControllers.getAll);
routes.get("/detalhes/:id", tarefaControllers.getById);
routes.get("/criar", tarefaControllers.criar);
routes.post("/criacao", tarefaControllers.criacao);
routes.get("/editar/:id", tarefaControllers.editar1);
routes.post("/editar/:id", tarefaControllers.editar);
routes.get("/deletar/:id", tarefaControllers.deletar);


module.exports = routes;