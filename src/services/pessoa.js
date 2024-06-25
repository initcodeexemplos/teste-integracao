const RepositorioExercicio = require("../repositories/pessoa.js");

const repositorio = new RepositorioExercicio();

class ServicoExercicio {

    async PegarUm(id){
        if(!id || isNaN(id)) {
            throw new Error("Favor corretamente o id.");
        }
        return repositorio.PegarUm(id);
    }

    static async PegarTodos(transaction) {
        return repositorio.PegarTodos(transaction);
    }

    static async Adicionar(pessoa, transaction) {
        if (!pessoa) {
            throw new Error("Favor preencher o pessoa.");
        } else if (!pessoa.nome) {
            throw new Error("Favor preencher o nome.");
        } else if (!pessoa.email) {
            throw new Error("Favor preencher o email.");
        } else if (!pessoa.senha) {
            throw new Error("Favor preencher o senha.");
        }
    
        return repositorio.Adicionar(pessoa, transaction);
    }

    static async Alterar(id, pessoa, transaction){
        if(!id || isNaN(id)) {
            throw new Error("Favor corretamente o id.");
        }

        return repositorio.Alterar(id, pessoa, transaction);
    }

    static async Deletar(id, transaction){
        if(!id || isNaN(id)) {
            throw new Error("Favor corretamente o id.");
        }

        return repositorio.Deletar(id, transaction);
    }

    async PegarPorEmail(email, transaction){
        if (!email) {
            throw new Error("Favor preencher o email.");
        }

        return repositorio.PegarPorEmail(email, transaction);
    }
}

module.exports = ServicoExercicio;
