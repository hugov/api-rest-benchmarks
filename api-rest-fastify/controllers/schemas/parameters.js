const parameter = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    key: { type: 'string' },
    value: { type: 'string' },
    status: { type: 'number' },
  },
};

const getParametersSchema = {
  response: {
    200: {
      type: 'array',
      items: parameter,
    },
  },
};

const getParameterSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: parameter,
  },
};

const addParameterSchema = {
  body: {
    type: 'object',
    required: ['key', 'value', 'status'],
    properties: {
      key: { type: 'string' },
      value: { type: 'string' },
      status: { type: 'number' }
    },
  },
  response: {
    200: { type: 'string' }
  },
};

const updateParameterSchema = {
  body: {
    type: 'object',
    required: ['key', 'value', 'status'],
    properties: {
      key: { type: 'string' },
      value: { type: 'string' },
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

const deleteParameterSchema = {
  params: {
    id: { type: 'number' },
  },
  response: {
    200: { type: 'string' }
  },
};

module.exports = {
  getParametersSchema,
  getParameterSchema,
  addParameterSchema,
  updateParameterSchema,
  deleteParameterSchema,
};