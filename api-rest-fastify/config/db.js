const fastifyPlugin = require('fastify-plugin') 
const { Client } = require('pg') 

require('dotenv').config() 

const client = new Client({ 
    user: process.env.POSTGRES_USER, 
    password: process.env.POSTGRES_PASSWORD, 
    host: process.env.DATABASE_HOST, 
    port: 5432, 
    database: process.env.POSTGRES_DB 
})

async function dbconnector(fastify, options) { 
    try { 
        await client.connect() 
        console.log('Banco de dados conectado com sucesso') 
        fastify.decorate('db', {client}) 
    } catch(err) { 
        console.error(err) 
    } 
}

module.exports= fastifyPlugin(dbconnector)