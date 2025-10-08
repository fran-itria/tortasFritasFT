import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface CreateIncomes {
    amount: number,
    category: string,
    date: Date
}

@Table({ tableName: 'incomes', timestamps: false })
export class Incomes extends Model<Incomes, CreateIncomes> {
    @PrimaryKey
    @Column(
        {
            type: DataType.UUID,
            defaultValue: DataType.UUIDV4,
            primaryKey: true,
        }
    )
    declare id: string;
    @Column(
        {
            type: DataType.INTEGER,
            allowNull: false,
        }
    )
    amount: number;
    @Column(
        {
            type: DataType.ENUM,
            values: ['cash', 'transfer'],
            allowNull: false,
        }
    )
    category: 'cash' | 'transfer';
    @Column(
        {
            type: DataType.DATEONLY,
            allowNull: false,
        })
    date: Date;
}