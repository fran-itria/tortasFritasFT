
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

interface updateOptionsProps {
    ordersActive?: boolean;
    open?: string[];
    address?: string;
}

@Table({ tableName: 'options' })
export class Options extends Model<Options, updateOptionsProps> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    ordersActive: boolean;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        defaultValue: [
            'Lun - Sab: 09:00 - 13:00 / 16:45 - 22:00',
            'Dom: 16:45 - 22:00',
        ]
    })
    open: string[];

    @Column({
        type: DataType.STRING,
        defaultValue: 'Rosario del Tala 543',
    })
    address: string;
}
