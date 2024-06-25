const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const ServicoExercicio = require("../src/services/pessoa.js");
const { sequelize } = require('../src/database.js');

describe('Testes listar pessoas', () => {

    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.info('Iniciando TDD com jest!');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    });

    it('Should list all names', async () => {
        const transaction = await sequelize.transaction();
        try {
            const records = await ServicoExercicio.PegarTodos(transaction);
            
            // Verificações
            expect(records).toBeInstanceOf(Array);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Erro ao executar o teste:', error);
        }
    });

    afterAll(async () => {
        try {
            await sequelize.close();
            console.info('Encerrados os testes');
        } catch (error) {
            console.error('Erro ao desconectar do banco de dados:', error);
        }
    });
});
