import { DataTypes, Sequelize } from "sequelize";

export default function (sequelize: Sequelize) {
    sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            timestamps: false
        }
    )
}