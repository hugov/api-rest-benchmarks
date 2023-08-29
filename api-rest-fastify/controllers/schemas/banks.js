const bank = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    code: { type: 'number' },
    description: { type: 'string' },
    status: { type: 'number' }
  },
};

const getBanksSchema = {
  response: {
    200: {
      type: 'array',
      items: bank,
    },
  },
};

const getBankSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: bank,
  },
};

const addBankSchema = {
  body: {
    type: 'object',
    required: ['code', 'description', 'status'],
    properties: {
      code: { type: 'number' },
      description: { type: 'string' },
      status: { type: 'number' }
    },
  },
  response: {
    200: { type: 'string' }
  },
};

const updateBankSchema = {
  body: {
    type: 'object',
    required: ['code', 'description', 'status'],
    properties: {
      code: { type: 'number' },
      description: { type: 'string' },
      status: { type: 'number' }
    },
  },
  params: {
    id: { type: 'number' },
  },
  response: {
    200: { type: 'string' }
  },
};

const deleteBankSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: { type: 'string' }
  },
};

module.exports = {
  getBanksSchema,
  getBankSchema,
  addBankSchema,
  updateBankSchema,
  deleteBankSchema,
};