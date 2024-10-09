import pg from 'pg'
const { Client } = pg
 
const client = new Client({
  user: 'default',
  password: 'KH9cSNqk8OYt',
  host: 'ep-shy-sunset-a46gvpce-pooler.us-east-1.aws.neon.tech',
  port: 5432,
  database: 'bddpark',
  ssl: true
})
client.connect();

export default {client};
