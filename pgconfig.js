import pg from 'pg'
const { Client } = pg
 
const client = new Client({
  user: 'default',
  password: 'KH9cSNqk8OYt',
  host: 'ep-shy-sunset-a46gvpce-pooler.us-east-1.aws.neon.tech',
  port: 3000,
  database: 'verceldb',
  ssl: true
});

export default client;
