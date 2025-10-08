import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface CreateExpenses {
    amount: number,
    category: string,
    date: Date
}

@Table({ tableName: 'expenses', timestamps: false })
export class Expenses extends Model<Expenses, CreateExpenses> {
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
            type: DataType.STRING,
            allowNull: false,
        }
    )
    category: string;
    @Column(
        {
            type: DataType.DATEONLY,
            allowNull: false,
        })
    date: Date;
}