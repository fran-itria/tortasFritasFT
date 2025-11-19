import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderProduct } from "src/order_product/order_product.model";

interface ProductCreate {
    name: string
    amount: number
    description?: string
    varity?: { name: string, stock: boolean }[]
    soldOut?: boolean
    image?: string
}

@Table({
    tableName: 'products',
    timestamps: false
})
export class Products extends Model<Products, ProductCreate> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare amount: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare description: string;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    declare varity: { id: string, name: string, stock: boolean }[];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    declare soldOut: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1,
    })
    declare active: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare image: string;

    @HasMany(() => OrderProduct)
    orderProducts: OrderProduct[];
}