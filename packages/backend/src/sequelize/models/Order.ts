/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { DataTypes, Sequelize, ModelCtor, Model } from 'sequelize';

export default function (sequelize: Sequelize): ModelCtor<Model> {
  return sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      state: {
        type: DataTypes.ENUM,
        values: ['pending', 'cancel', 'accept', 'completed', 'delivered'],
        defaultValue: 'pending',
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      paymentMethod: {
        type: DataTypes.ENUM,
        values: ['cash', 'transfer'],
        allowNull: false,
      },
      cash: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // time: {
      //     type: DataTypes.DATEONLY,
      //     allowNull: false
      // }
    },
    {
      timestamps: false,
    },
  );
}
