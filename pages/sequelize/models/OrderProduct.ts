import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
    sequelize.define(
        'OrderProduct',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            orderId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            varity: {
                type: DataTypes.STRING,
                allowNull: true
            },
            unitPrice: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            totalPrice: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        {
            timestamps: false,
            // Importante: Desactivar la clave primaria compuesta automática
            indexes: [
                {
                    fields: ['orderId', 'productId', 'varity'],
                    unique: false // Permitir duplicados de orderId + productId con diferentes varietys
                }
            ]
        }
    )
}
