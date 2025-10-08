import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Orders } from "src/orders/orders.model";
import { Products } from "src/products/product.model";

export interface OrderProductCreationAttributes {
    orderId: string;
    productId: string;
    quantity: number;
    varity?: string | null;
    unitPrice: number;
    totalPrice: number;
}

@Table({
    tableName: 'order_product',
    timestamps: false,
    indexes: [
        {
            fields: ['orderId', 'productId', 'varity'],
            unique: false
        },
    ],
})
export class OrderProduct extends Model<OrderProduct, OrderProductCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => Orders)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    orderId: string;

    @ForeignKey(() => Products)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    productId: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1
    })
    quantity: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    varity: string | null;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    unitPrice: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    totalPrice: number;

    @BelongsTo(() => Orders)
    order: Orders

    @BelongsTo(() => Products)
    product: Products
}