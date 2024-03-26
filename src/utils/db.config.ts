import { Sequelize } from 'sequelize';

const client = new Sequelize({
  host: 'localhost',
  username: 'postgres',
  password: '1234',
  database: 'vb_team',
  dialect: 'postgres'
});

export { client };
