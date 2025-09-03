import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
    sequelize.define(
        'Bills',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            category: {
                type: DataTypes.ENUM,
                values: ['cash', 'transfer'],
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    )
}