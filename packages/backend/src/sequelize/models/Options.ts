/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { DataTypes, Sequelize, ModelCtor, Model } from 'sequelize';

export default function (sequelize: Sequelize): ModelCtor<Model> {
  return sequelize.define(
    'options',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ordersActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      openingHours: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [
          'Lun - Sab: 09:00 - 12:30 / 15:45 - 19:30',
          'Dom: 15:45 - 19:30',
        ],
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: 'Rosario del Tala 543',
        allowNull: true,
      },
    },
    {
      timestamps: true,
    },
  );
}
