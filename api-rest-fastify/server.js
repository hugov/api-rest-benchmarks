const fastify = require('fastify')({ logger: true });
//const fastify = require('fastify')()

const dbconnector = require('./config/db')
const configuration = require('./config/configuration')

fastify.register(dbconnector)

fastify.register(require('@fastify/jwt'), {
    secret: configuration.secretKey
})

fastify.addHook("onRequest", async (request, reply) => {
    try {
        if(request.routerPath == '/login' || request.routerPath == '/api/banks')
            return
        await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
})

fastify.register(require('./routes/authenticate'))
fastify.register(require('./routes/users'))
fastify.register(require('./routes/banks'))
fastify.register(require('./routes/parameters'))

const start = async () => {
    try {
        await fastify.listen({ port: 5000, host: 'api' })
        fastify.log.info(`listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()