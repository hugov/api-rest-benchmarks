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

        console.log('Consultando a lista de bancos cadastrados')

        debugger

        let user = request.user
        console.log('user: ', user)

        await client.query('SELECT * FROM banks')
            .then(results => {
                const banks = results.rows;
                console.log('results: ' , banks);
                reply.send(banks);
            });

    });
  
    // get a parameter
    fastify.get('/api/banks/:id', {schema: getBankSchema}, async function (request, reply) {

        console.log('Consultando o banco pelo id')

        const { id } = request.params;

        await client.query('SELECT * FROM banks WHERE id = $1', [id])
            .then(result => {
                const parameter = result.rows[0];
                console.log('Parâmetro: ', parameter);

                if (!parameter) {
                    return reply.status(404).send(new Error('Bank not found'));
                }
                
                return reply.send(parameter);
            });

    });
  
    // create a new parameter
    fastify.post('/api/banks/new', {schema: addBankSchema}, async function (request, reply) {

        console.log('Criando um novo registro de parâmetro')

        const { code, description, status } = request.body;

        const query = {
            text: `INSERT INTO banks (code, description, status)
                            VALUES($1, $2, $3) RETURNING *`,
            values: [code, description, status],
        }

        try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            reply.code(201)
            reply.send('Bank added');
        } catch (err) {
            throw new Error(err)
        }

    });
  
    // update a parameter
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
                return reply.status(404).send(new Error("Bank doesn't exist"));
            }

            reply.code(204)
            return reply.send('Bank updated');
        } catch (err) {
            throw new Error(err)
        }

    });
  
    // delete a parameter
    fastify.delete('/api/banks/:id', {schema: deleteBankSchema}, async function (request, reply) {

        console.log('Consultando o banco pelo id')

        const { id } = request.params;

        try {
            const {rows} = await client.query('DELETE FROM banks WHERE id = $1 RETURNING *', [id])

            parameter = rows[0]
            console.log(parameter)

            if (!parameter) {
                return reply.status(404).send(new Error("Bank doesn't exist"));
            }

            reply.code(204)
            return reply.send('Bank deleted');
        } catch(err) {
            throw new Error(err)
        }

    });

};
  
module.exports = bankRoutes;