const enviornment = process.env.NODE_ENV || "development";
const knex = require('knex');
const config = require('../knexfile');
const configOption = config[enviornment]
module.exports = knex(configOption)
