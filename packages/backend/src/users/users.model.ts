import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

// Interfaz para los atributos de creación
export interface UserCreationAttributes {
    id: string;
    name: string;
    surname: string;
    email: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttributes> {
    @PrimaryKey
    @Column(DataType.STRING)
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    surname: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    phone: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    admin: boolean

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    active: boolean
}