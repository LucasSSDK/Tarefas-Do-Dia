const { Sequelize } = require("sequelize");
const database = require("../database/bd");


const Tarefa = database.sequelize.define(
    "tarefa",
    {
        id: {
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome:{
            type: Sequelize.STRING ,
            allowNull: false,
        },

        detalhes: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
{
    freezeTableName: true,
    timestamp: false,
    createdAt: false,
    updatedAt: false,
}

);
const initTable = async () =>{
  await Tarefa.sync();
}

initTable();

module.exports = Tarefa; 