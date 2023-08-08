//const fastify = require('fastify')({ logger: true });
const fastify = require('fastify')();
const PORT = process.env.PORT || 5000
const dbconnector = require('./config/db')

fastify.register(dbconnector)

fastify.register(require('./routes/users'));
fastify.register(require('./routes/banks'));
fastify.register(require('./routes/parameters'));

const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '127.0.0.1' });
        fastify.log.info(`listening on ${fastify.server.address().port}`)

    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();