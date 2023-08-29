const {
    createUserSchema,
    getUsersSchema,
    getUserSchema,
    addUserSchema,
    updateUserSchema,
    deleteUserSchema,
} = require('../controllers/schemas/users.js');

async function userRoutes(fastify, options) {

    const client = fastify.db.client

    fastify.get('/api/users', {schema: getUsersSchema}, async function (request, reply) {

        console.log('Listando os bancos cadastrados')

        await client.query('SELECT * FROM users')
            .then(results => {
                const users = results.rows;
                const milliseconds = reply.getResponseTime()
                console.log('results: ' , users);
                console.log('Tempo processamento: ', milliseconds)
                reply.send( users );
            });

    });
  
    fastify.get('/api/users/:id', {schema: getUserSchema}, async function (request, reply) {

        console.log('Consultando o banco pelo id')

        const { id } = request.params;

        await client.query('SELECT * FROM users WHERE id = $1', [id])
            .then(result => {
                const user = result.rows[0];
                console.log('Parâmetro: ', user);

                if (!user) {
                    return reply.status(404).send(new Error('Banco não encontrado'));
                }
                
                return reply.send(user);
            });

    });
  
    fastify.post('/api/users/create-user', {schema: createUserSchema}, async function (request, reply) {

        console.log('Criando a conta do usuário')

        debugger;

        const { username, password, email } = request.body;
        const status = 2;

        console.log('username: {username}')

        const query = {
            text: `INSERT INTO users (username, password, email, status)
                            VALUES($1, $2, $3, $4) RETURNING *`,
            values: [username, password, email, status],
        }

        try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            reply.code(201).send('Banco adicionado com sucesso.');
        } catch (err) {
            throw new Error(err)
        }

    });

    fastify.post('/api/users/new', {schema: addUserSchema}, async function (request, reply) {

        console.log('Adicionando o registro do banco.')

        const { code, description, status } = request.body;

        const query = {
            text: `INSERT INTO users (code, description, status)
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
  
    fastify.put('/api/users/edit/:id', {schema: updateUserSchema}, async function (request, reply) {

        console.log('Alterando o registro de um banco')

        const id = request.params.id
        const { code, description, status } = request.body;

        const query = {
            text:  `UPDATE users SET 
                            code = COALESCE($1, code), 
                            description = COALESCE($2, description), 
                            status = COALESCE($3, status) 
                            WHERE id = $4 RETURNING *`,
            values : [code, description, status, id]
        }

        try {
            const {rows} = await client.query(query)

            user = rows[0]
            console.log(user)

            if (!user) {
                return reply.status(404).send(new Error('Banco não encontrado'));
            }

            reply.code(204)
            return reply.send('Banco alterado com sucesso');
        } catch (err) {
            throw new Error(err)
        }

    });
  
    fastify.delete('/api/users/:id', {schema: deleteUserSchema}, async function (request, reply) {

        console.log('Apagando o registro do banco pelo id')

        const { id } = request.params;

        try {
            const {rows} = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])

            user = rows[0]
            console.log(user)

            if (!user) {
                return reply.status(404).send(new Error('Banco não encontrado'));
            }

            reply.code(204)
            return reply.send('Banco deletado com sucesso.');
        } catch(err) {
            throw new Error(err)
        }

    });

};
  
module.exports = userRoutes;