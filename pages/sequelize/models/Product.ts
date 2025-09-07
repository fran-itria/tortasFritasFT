import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
    sequelize.define(
        'Product',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            varity: {
                type: DataTypes.ARRAY(DataTypes.JSON),
                allowNull: true
            },
            soldOut: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            timestamps: false
        }
    )
}