import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
    sequelize.define(
        'Order',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            state: {
                type: DataTypes.ENUM,
                values: ['pending', 'cancel', 'accept', 'completed', 'delivered'],
                defaultValue: 'pending',
                allowNull: false
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            time: {
                type: DataTypes.TIME,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    )
}