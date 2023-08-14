const {
    getParametersSchema,
    getParameterSchema,
    addParameterSchema,
    updateParameterSchema,
    deleteParameterSchema,
} = require('../controllers/schemas/parameters.js');

const DEBUG = false
  
async function parameterRoutes(fastify, options) {  

    const client = fastify.db.client

    fastify.get('/api/parameters', {schema: getParametersSchema}, async function (request, reply) {

        DEBUG && console.log('Consultando a lista de parâmetros cadastrados')

        await client.query('SELECT * FROM parameters')
            .then(results => {
                const parameters = results.rows;

                DEBUG && console.log('results: ' , parameters);
                
                reply.send(parameters);
            });

    });
  
    // get a parameter
    fastify.get('/api/parameters/:id', {schema: getParameterSchema}, async function (request, reply) {

        DEBUG && console.log('Consultando o parâmetro pelo id')

        const { id } = request.params;

        await client.query('SELECT * FROM parameters WHERE id = $1', [id])
            .then(result => {
                const parameter = result.rows[0];
                console.log('Parâmetro: ', parameter);

                if (!parameter) {
                    return reply.status(404).send(new Error('Parameter not found'));
                }
                
                return reply.send(parameter);
            });

    });
  
    // create a new parameter
    fastify.post('/api/parameters/new', {schema: addParameterSchema}, async function (request, reply) {

        DEBUG && console.log('Criando um novo registro de parâmetro')

        const { key, value, status } = request.body;

        const query = {
            text: `INSERT INTO parameters (key, value, status)
                            VALUES($1, $2, $3) RETURNING *`,
            values: [key, value, status],
        }

        try {
            const {rows} = await client.query(query)
            DEBUG && console.log(rows[0])
            reply.code(201).send('Parameter added');
            //reply.send('Parameter added');
        } catch (err) {
            throw new Error(err)
        }

    });
  
    // update a parameter
    fastify.put('/api/parameters/edit/:id', {schema: updateParameterSchema}, async function (request, reply) {

        console.log('Alterando o registro de um parâmetro')

        const id = request.params.id
        const { key, value, status } = request.body;

        const query = {
            text:  `UPDATE parameters SET 
                            key = COALESCE($1, key), 
                            value = COALESCE($2, value), 
                            status = COALESCE($3, status) 
                            WHERE id = $4 RETURNING *`,
            values : [key, value, status, id]
        }

        try {
            const {rows} = await client.query(query)

            parameter = rows[0]
            console.log(parameter)

            if (!parameter) {
                return reply.status(404).send(new Error("Parameter doesn't exist"));
            }

            reply.code(204)
            return reply.send('Parameter updated');
        } catch (err) {
            throw new Error(err)
        }

    });
  
    // delete a parameter
    fastify.delete('/api/parameters/:id', {schema: deleteParameterSchema}, async function (request, reply) {

        console.log('Consultando o parâmetro pelo id')

        const { id } = request.params;

        try {
            const {rows} = await client.query('DELETE FROM parameters WHERE id = $1 RETURNING *', [id])

            parameter = rows[0]
            console.log(parameter)

            if (!parameter) {
                return reply.status(404).send(new Error("Parameter doesn't exist"));
            }

            reply.code(204)
            return reply.send('Parameter deleted');
        } catch(err) {
            throw new Error(err)
        }

    });
  
};
  
module.exports = parameterRoutes;