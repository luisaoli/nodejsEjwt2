const { promisify } = require('util')

module.exports = lista => {
    const setAsync = promisify(lista.set).bind(lista);
    const existsAsync = promisify(lista.exists).bind(lista);
    const getAsync = promisify(lista.get).bind(lista);
    const delAsync = promisify(lista.delete).bind(lista);

    return {
        async adiciona(chave, valor, dataExpiracao) {
            await setAsync(chave, valor);
            lista.expireat(chave, dataExpiracao);
        },

        async buscaValor(chave) {
            return getAsync(chave);
        },

        async contemToken(chave) {
            const resultado = await existsAsync(chave);
            return resultado === 1;
        },

        async deleta(chave) {
            await delAsync(chave);
        }
    }
}
