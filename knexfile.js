// Update with your config settings.
require('dotenv').config()



const sharedConfig = {
  client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations:{
      directory:'./data/migrations'
    },
    seeds:{
      directory:'./data/seeds'
    },
    useNullAsDefault: true,
}


module.exports = {

  development: {
    ...sharedConfig,
  },

 production: {
   ...sharedConfig,
  
 }



};
