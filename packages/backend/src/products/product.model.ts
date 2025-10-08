import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

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
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    description: string;

    @Column({
        type: DataType.ARRAY(DataType.JSON),
        allowNull: true,
    })
    varity: object[];

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    soldOut: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    image: string;
}