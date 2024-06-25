const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const ServicoExercicio = require("../src/services/pessoa.js");
const { sequelize } = require('../src/database.js');

describe('Testes do primeiro exercício', () => {
    console.log(ServicoExercicio); // Deve exibir a classe ou função construtora

    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.info('Iniciando TDD com jest!');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    });

    it('Should add a name', async () => {
        const transaction = await sequelize.transaction();
        try {
            const dataTest = {
                nome: 'Edu',
                email: 'edua@example.com',
                senha: '12345'
            };
            const addedRecord = await ServicoExercicio.Adicionar(dataTest, transaction);
            const qtdeAfterAdd = (await ServicoExercicio.PegarTodos(transaction)).length;

            // Verificações
            expect(addedRecord).toHaveProperty('id');
            expect(qtdeAfterAdd).toBeGreaterThan(0);

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
