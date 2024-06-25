const Pessoa = require('../models/pessoa.js');

class RepositorioExercicio {

    async PegarUm(id){
        return Pessoa.findOne({
            where: {
                id
            }
        });
    }

    async PegarTodos(transaction){
        return Pessoa.findAll({ transaction });
    }

    async Adicionar(pessoa, transaction){
        return Pessoa.create(pessoa, { transaction });
    }

    async Alterar(id, pessoa, transaction){
        return Pessoa.update(pessoa, {
            where: {
                id
            },
            transaction
        });
    }

    async Deletar(id, transaction){
        return Pessoa.destroy({
            where: {
                id
            },
            transaction
        });
    }

    async PegarPorEmail(email, transaction){
        return Pessoa.findOne({
            where: {
                email
            },
            transaction
        });
    }
}

module.exports = RepositorioExercicio;
