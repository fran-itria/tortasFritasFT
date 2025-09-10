import { Sequelize } from "sequelize";
import user from "./models/User";
import product from "./models/Product";
import order from "./models/Order";
import options from "./models/Options";
import income from "./models/Income";
import bills from "./models/Bills";
import orderProduct from "./models/OrderProduct";

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
product(sequelize);
order(sequelize);
options(sequelize);
income(sequelize);
bills(sequelize);
orderProduct(sequelize);

const { User, Product, Order, Options, Income, Bills, OrderProduct } = sequelize.models

// User - Order 
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Asociaciones directas para la tabla intermedia OrderProduct
Order.hasMany(OrderProduct, { foreignKey: 'orderId', as: 'Products' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderProduct, { foreignKey: 'productId' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId' });

sequelize.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada correctamente');
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});

export { User, Product, Order, Options, Income, Bills, OrderProduct }
export default sequelize;
