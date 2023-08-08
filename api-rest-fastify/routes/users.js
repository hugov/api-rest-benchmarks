const {
    getUsersSchema,
    getUserSchema,
    addUserSchema,
    updateUserSchema,
    deleteUserSchema,
} = require('../controllers/schemas/users.js');
  
const {
    getUsersHandler,
    getUserHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler,
} = require('../controllers/handlers/users.js');
  
const getUsersOpts = {
    schema: getUsersSchema,
    handler: getUsersHandler,
};
  
const getUserOpts = {
    schema: getUserSchema,
    handler: getUserHandler,
};
  
const addUserOpts = {
    schema: addUserSchema,
    handler: addUserHandler,
};
  
const updateUserOpts = {
    schema: updateUserSchema,
    handler: updateUserHandler,
};
  
const deleteUserOpts = {
    schema: deleteUserSchema,
    handler: deleteUserHandler,
};
  
const userRoutes = (fastify, opts, done) => {
    // get all users
    fastify.get('/api/users', getUsersOpts);
  
    // get a user
    fastify.get('/api/users/:id', getUserOpts);
  
    // create a new user
    fastify.post('/api/users/new', addUserOpts);
  
    // update a user
    fastify.put('/api/users/edit/:id', updateUserOpts);
  
    // delete a user
    fastify.delete('/api/users/:id', deleteUserOpts);
  
    done();
};
  
module.exports = userRoutes;