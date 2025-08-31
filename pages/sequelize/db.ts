import { Sequelize } from "sequelize";
import user from "./models/User";

const { PG_DATABASE_URL } = process.env
const sequelize =
    PG_DATABASE_URL ? new Sequelize(PG_DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
        :
        new Sequelize({
            dialect: "postgres",
            host: process.env.PGHOST,
            port: 5432,
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            logging: false,
            native: false,
            dialectOptions: {
                ssl: {
                    require: true,
                }
            }
        });

user(sequelize);

sequelize.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada correctamente');
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});

const { User } = sequelize.models

export { User }
export default sequelize;
