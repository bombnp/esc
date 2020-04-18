require('dotenv-flow').config({
  default_node_env: 'development',
});

type Env = 'production' | 'development' | 'test'

export const NODE_ENV      = process.env.NODE_ENV as Env;
export const JWT_SECRET    = process.env.JWT_SECRET;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const HOST          = process.env.HOST;
export const PORT          = +process.env.PORT;
export const API_ENDPOINT  = `http://${HOST}:${PORT}`;

console.log(module.exports);