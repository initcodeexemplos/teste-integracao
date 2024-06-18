const ServicoExercicio = require('../src/services/pessoa')

describe("Meu teste de integração", () => {
    const service = new ServicoExercicio();

    it("Adicionar uma pessoa", async () => {
        const dataTest = {
            nome: "Teste",
            email: "teste@teste.com",
            senha: "12345678"
        }
    
        const { dataValues } = await service.Adicionar(dataTest);

        expect(dataValues.nome).toBe(dataTest.nome)
        expect(dataValues.email).toBe(dataTest.email)
        expect(dataValues.senha).toBe(dataTest.senha)
    })
})