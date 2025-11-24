import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderProduct } from "src/order_product/order_product.model";
import { Users } from "src/users/user.model";

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
        values: ['pending', 'cancel', 'accept', 'completed', 'delivered', 'rejected'],
        allowNull: false,
        defaultValue: 'pending'
    })
    declare state: 'pending' | 'cancel' | 'accept' | 'completed' | 'delivered' | 'rejected'

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare amount: number

    @Column({
        type: DataType.ENUM,
        values: ['cash', 'transfer'],
        allowNull: false
    })
    declare paymentMethod: 'cash' | 'transfer'

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    declare cash: number | undefined

    @ForeignKey(() => Users)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare userId: string

    @BelongsTo(() => Users)
    declare user: Users

    @HasMany(() => OrderProduct)
    declare orderProducts: OrderProduct[]
}