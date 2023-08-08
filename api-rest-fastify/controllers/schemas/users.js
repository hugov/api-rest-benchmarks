const typeString = { type: 'string' }; // since i will be using this type a lot

const user = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: typeString,
    body: typeString,
  },
};

const getUsersSchema = {
  response: {
    200: {
      type: 'array',
      items: user,
    },
  },
};

const getUserSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: user,
  },
};

const addUserSchema = {
  body: {
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: typeString,
      body: typeString,
    },
  },
  response: {
    200: typeString, // sending a simple message as string
  },
};

const updateUserSchema = {
  body: {
    type: 'object',
    required: ['title', 'body'],
    properties: {
      title: typeString,
      body: typeString,
    },
  },
  params: {
    id: { type: 'number' },
  },
  response: {
    200: typeString, // a simple message will be sent
  },
};

const deleteUserSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  getUsersSchema,
  getUserSchema,
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
};