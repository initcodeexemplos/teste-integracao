const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const ServicoExercicio = require("../src/services/pessoa.js");
const { sequelize } = require('../src/database.js');

describe('Testes do primeiro exercício', () => {
 

    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.info('Iniciando TDD com jest!');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    });

    it('Should update a name', async () => {
        const transaction = await sequelize.transaction();
        try {
            const dataTest = {
                nome: 'professor',
                email: 'professor@example.com',
                senha: '12345'
            };
            const addedRecord = await ServicoExercicio.Adicionar(dataTest, transaction);

            const updatedData = {
                nome: 'Renan',
                email: 'renan@example.com',
                senha: '12345'
            };
            await ServicoExercicio.Alterar(addedRecord.id, updatedData, transaction);
            const updatedRecord = await ServicoExercicio.PegarTodos(transaction);

            // Verificações
            expect(updatedRecord.find(record => record.id === addedRecord.id).nome).toBe('Renan');

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
