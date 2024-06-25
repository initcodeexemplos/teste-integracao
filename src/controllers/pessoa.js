

const ServicoExercicio = require("../services/pessoa.js");
const { sequelize } = require('../database.js');

const servico = new ServicoExercicio();

class ControllerExercicio {

    async PegarUm(req, res){
        try {
            const id = req.params.id;
            const result = await servico.PegarUm(id);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message }); 
        }
    }

    async PegarTodos(req, res){
        try {
            const result = await servico.PegarTodos();
            res.status(201).json(result); 
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async Adicionar(req, res){
        const transaction = await sequelize.transaction();
        try {
            const pessoa = req.body;
            await servico.Adicionar(pessoa, transaction);
            await transaction.commit();
            res.status(201).json({ message: "Adicionado com sucesso!" });
        } catch (error) {
            await transaction.rollback();
            if (error.parent && error.parent.code === "ER_DUP_ENTRY") {
                res.status(500).json({ message: "Email já cadastrado!" });
            } else {
                res.status(500).json({ message: error.parent ? error.parent.message : error.message });
            }
        }
    }

    async Alterar(req, res){
        const transaction = await sequelize.transaction();
        try {
            const id = req.params.id;
            const pessoa = req.body;
            await servico.Alterar(id, pessoa, transaction);
            await transaction.commit();
            res.status(200).json({ message: "Alterado com sucesso!" });
        } catch (error) {
            await transaction.rollback();
            res.status(500).json({ message: error.errors ? error.errors.message : error.message });
        }
    }

    async Deletar(req, res){
        try {
            const id = req.params.id;
            await servico.Deletar(id);
            res.status(200).json({ message: "Deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async PegarPorEmail(req, res){
      try {
        const email = req.params.email

        const result = await servico.PegarPorEmail(email)
        
        res.status(200).json(result);
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message}); 
      }
    }
}

module.exports = ControllerExercicio;
