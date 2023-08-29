const user = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    document_type: { type: 'number' },
    document: { type: 'string' },
    dob: { type: 'string' },
    email: { type: 'string' },
    phone_number: { type: 'string' },
    mother_name: { type: 'string' },
    zip_code: { type: 'string' },
    street: { type: 'string' },
    number: { type: 'number' },
    complement: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    bank: { type: 'string' },
    branch: { type: 'number' },
    account: { type: 'string' },
    pix_type: { type: 'number' },
    pix_key: { type: 'string' },
    status: { type: 'number' },
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

const createUserSchema = {
  body: {
    type: 'object',
    required: ['username', 'password', 'email'],
    properties: {
      id: { type: 'number' },
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string' }
    },
  },
  response: {
    200: { type: 'string' } // sending a simple message as string
  },
};

const addUserSchema = {
  body: {
    type: 'object',
    //required: ['username', 'password'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      document_type: { type: 'number' },
      document: { type: 'string' },
      dob: { type: 'string' },
      email: { type: 'string' },
      phone_number: { type: 'string' },
      mother_name: { type: 'string' },
      zip_code: { type: 'string' },
      street: { type: 'string' },
      number: { type: 'number' },
      complement: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      bank: { type: 'string' },
      branch: { type: 'number' },
      account: { type: 'string' },
      pix_type: { type: 'number' },
      pix_key: { type: 'string' },
      status: { type: 'number' },
    },
  },
  response: {
    200: { type: 'string' } // sending a simple message as string
  },
};

const updateUserSchema = {
  body: {
    type: 'object',
    //required: ['title', 'body'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      document_type: { type: 'number' },
      document: { type: 'string' },
      dob: { type: 'string' },
      email: { type: 'string' },
      phone_number: { type: 'string' },
      mother_name: { type: 'string' },
      zip_code: { type: 'string' },
      street: { type: 'string' },
      number: { type: 'number' },
      complement: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      bank: { type: 'string' },
      branch: { type: 'number' },
      account: { type: 'string' },
      pix_type: { type: 'number' },
      pix_key: { type: 'string' },
      status: { type: 'number' },
    },
  },
  params: {
    id: { type: 'number' },
  },
  response: {
    200: { type: 'string' }
  },
};

const deleteUserSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: { type: 'string' }
  },
};

module.exports = {
  createUserSchema,
  getUsersSchema,
  getUserSchema,
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
};