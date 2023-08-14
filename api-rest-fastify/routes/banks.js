const {
    getBanksSchema,
    getBankSchema,
    addBankSchema,
    updateBankSchema,
    deleteBankSchema,
} = require('../controllers/schemas/banks.js');

async function bankRoutes(fastify, options) {

    const client = fastify.db.client

    fastify.get('/api/banks', {schema: getBanksSchema}, async function (request, reply) {

        console.log('Listando os bancos cadastrados')

        await client.query('SELECT * FROM banks')
            .then(results => {
                const banks = results.rows;
                console.log('results: ' , banks);
                reply.send(banks);
            });

    });
  
    fastify.get('/api/banks/:id', {schema: getBankSchema}, async function (request, reply) {

        console.log('Consultando o banco pelo id')

        const { id } = request.params;

        await client.query('SELECT * FROM banks WHERE id = $1', [id])
            .then(result => {
                const parameter = result.rows[0];
                console.log('Parâmetro: ', parameter);

                if (!parameter) {
                    return reply.status(404).send(new Error('Banco não encontrado'));
                }
                
                return reply.send(parameter);
            });

    });
  
    fastify.post('/api/banks/new', {schema: addBankSchema}, async function (request, reply) {

        console.log('Adicionando o registro do banco.')

        const { code, description, status } = request.body;

        const query = {
            text: `INSERT INTO banks (code, description, status)
                            VALUES($1, $2, $3) RETURNING *`,
            values: [code, description, status],
        }

        try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            reply.code(201).send('Banco adicionado com sucesso.');
        } catch (err) {
            throw new Error(err)
        }

    });
  
    fastify.put('/api/banks/edit/:id', {schema: updateBankSchema}, async function (request, reply) {

        console.log('Alterando o registro de um banco')

        const id = request.params.id
        const { code, description, status } = request.body;

        const query = {
            text:  `UPDATE banks SET 
                            code = COALESCE($1, code), 
                            description = COALESCE($2, description), 
                            status = COALESCE($3, status) 
                            WHERE id = $4 RETURNING *`,
            values : [code, description, status, id]
        }

        try {
            const {rows} = await client.query(query)

            parameter = rows[0]
            console.log(parameter)

            if (!parameter) {
                return reply.status(404).send(new Error('Banco não encontrado'));
            }

            reply.code(204)
            return reply.send('Banco alterado com sucesso');
        } catch (err) {
            throw new Error(err)
        }

    });
  
    fastify.delete('/api/banks/:id', {schema: deleteBankSchema}, async function (request, reply) {

        console.log('Apagando o registro do banco pelo id')

        const { id } = request.params;

        try {
            const {rows} = await client.query('DELETE FROM banks WHERE id = $1 RETURNING *', [id])

            parameter = rows[0]
            console.log(parameter)

            if (!parameter) {
                return reply.status(404).send(new Error('Banco não encontrado'));
            }

            reply.code(204)
            return reply.send('Banco deletado com sucesso.');
        } catch(err) {
            throw new Error(err)
        }

    });

};
  
module.exports = bankRoutes;