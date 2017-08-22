import Dotenv from 'dotenv'

//if(process.env.NODE_ENV !== 'production') {
  Dotenv.config({path: process.env.PWD + '/.env'});
//}
