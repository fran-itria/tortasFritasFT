import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Orders } from "src/orders/order.model";

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
    declare name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare surname: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare phone: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare admin: boolean

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    declare active: boolean

    @HasMany(() => Orders, { foreignKey: 'userId' })
    orders: Orders[]
}