import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Expense,
  Income,
  Options,
  Order,
  OrderProduct,
  Product,
  Sequelize,
  User,
} from './db';

@Injectable()
export class DbProvider implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await Sequelize.sync({ force: true });
  }

  public readonly User = User;
  public readonly Product = Product;
  public readonly Order = Order;
  public readonly Options = Options;
  public readonly Income = Income;
  public readonly Expense = Expense;
  public readonly OrderProduct = OrderProduct;
}
