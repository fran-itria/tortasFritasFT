/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Sequelize } from 'sequelize';
import User from './models/User';
import Product from './models/Product';
import Order from './models/Order';
import Options from './models/Options';
import Income from './models/Income';
import Expense from './models/Expense';
import OrderProduct from './models/OrderProduct';
// const sequelize =
//     PG_DATABASE_URL ? new Sequelize(PG_DATABASE_URL, {
//         dialect: "postgres",
//         logging: false,
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         }
//     })
//         :
//         new Sequelize({
//             dialect: "postgres",
//             host: process.env.PGHOST,
//             port: 5432,
//             username: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//             logging: false,
//             native: false,
//             dialectOptions: {
//                 ssl: {
//                     require: true,
//                 }
//             }
//         });

const sequelize: Sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '8284',
  database: 'tortas_fritas_ft',
  logging: false,
  native: false,
});

User(sequelize);
Product(sequelize);
Order(sequelize);
Options(sequelize);
Income(sequelize);
Expense(sequelize);
OrderProduct(sequelize);

const { user, product, order, options, income, expense, order_product } =
  sequelize.models;

// User - Order
user.hasMany(order, { foreignKey: 'userId' });
order.belongsTo(user, { foreignKey: 'userId' });

// Asociaciones directas para la tabla intermedia OrderProduct
order.hasMany(order_product, { foreignKey: 'orderId', as: 'products' });
order_product.belongsTo(order, { foreignKey: 'orderId' });

product.hasMany(order_product, { foreignKey: 'productId' });
order_product.belongsTo(product, { foreignKey: 'productId' });

export {
  user as User,
  product as Product,
  order as Order,
  options as Options,
  income as Income,
  expense as Expense,
  order_product as OrderProduct,
  sequelize as Sequelize,
};
export default sequelize;
