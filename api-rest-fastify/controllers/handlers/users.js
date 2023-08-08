const users = require('../../cloud/users.js');

const getUsersHandler = (req, reply) => {
  reply.send(users);
};

const getUserHandler = (req, reply) => {
  const { id } = req.params;

  const user = users.filter((user) => {
    return user.id === id;
  })[0];

  if (!user) {
    return reply.status(404).send(new Error('User not found'));
  }

  return reply.send(user);
};

const addUserHandler = (req, reply) => {
  const { title, body } = req.body; // no body parser required for this to work

  const id = users.length + 1; // users is imported from cloud/users.js
  users.push({ id, title, body });

  reply.send('User added');
};

const updateUserHandler = (req, reply) => {
  const { title, body } = req.body;
  const { id } = req.params;

  const user = users.filter((user) => {
    return user.id === id;
  })[0];

  if (!user) {
    return reply.status(404).send(new Error("User doesn't exist"));
  }

  user.title = title;
  user.body = body;

  return reply.send('User updated');
};

const deleteUserHandler = (req, reply) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => {
    return user.id === id;
  });

  if (userIndex === -1) {
    return reply.status(404).send(new Error("User doesn't exist"));
  }

  users.splice(userIndex, 1);

  return reply.send('User deleted');
};

module.exports = {
  getUsersHandler,
  getUserHandler,
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
};