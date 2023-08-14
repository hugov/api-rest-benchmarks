async function authenticateRoutes(fastify, options) {  

    fastify.post('/login', async function (request, reply) {

        console.log('Gerando o Token');

        try {

            const token = fastify.jwt.sign(request.body);
            console.log('token: ', token);

            reply.send({ token })
        } catch (err) {
            throw new Error(err)
        }

    })

    /*
    fastify.get("/protected", {
            onRequest: [fastify.authenticate]
        },
        async function (request, reply) {
            return request.user
        }
    )
    */

};
  
module.exports = authenticateRoutes;