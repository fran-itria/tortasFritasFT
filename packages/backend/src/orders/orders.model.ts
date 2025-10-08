import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";

export interface OrderCreationAttributes {
    amount: number;
    paymentMethod: 'cash' | 'transfer';
    cash?: number;
    userId: string;
    state?: 'pending' | 'cancel' | 'accept' | 'completed' | 'delivered';
}

@Table({ tableName: 'orders' })
export class Orders extends Model<Orders, OrderCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.ENUM,
        values: ['pending', 'cancel', 'accept', 'completed', 'delivered'],
        allowNull: false,
        defaultValue: 'pending'
    })
    state: 'pending' | 'cancel' | 'accept' | 'completed' | 'delivered'

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount: number

    @Column({
        type: DataType.ENUM,
        values: ['cash', 'transfer'],
        allowNull: false
    })
    paymentMethod: 'cash' | 'transfer'

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    cash: number | undefined

    @ForeignKey(() => Users)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId: string

    @BelongsTo(() => Users)
    user: Users
}