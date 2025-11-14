
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
        type: DataType.JSONB,
        defaultValue: [
            { id: crypto.randomUUID(), day: 'Lunes', morning: ['09:00', '13:00'], afternoon: ['17:00', '22:00'] },
            { id: crypto.randomUUID(), day: 'Martes', morning: ['09:00', '13:00'], afternoon: ['17:00', '22:00'] },
            { id: crypto.randomUUID(), day: 'Miercoles', morning: ['09:00', '13:00'], afternoon: ['17:00', '22:00'] },
            { id: crypto.randomUUID(), day: 'Jueves', morning: ['09:00', '13:00'], afternoon: ['17:00', '22:00'] },
            { id: crypto.randomUUID(), day: 'Viernes', morning: ['09:00', '13:00'], afternoon: ['17:00', '22:00'] },
            { id: crypto.randomUUID(), day: 'Sabado', morning: ['09:00', '13:00'], afternoon: ['17:00', '22:00'] },
            { id: crypto.randomUUID(), day: 'Domingo', morning: null, afternoon: ['17:00', '22:00'] },
        ]
    })
    open: { id: string, day: string, morning: string[], afternoon: string[] }[];

    @Column({
        type: DataType.STRING,
        defaultValue: 'Rosario del Tala 543',
    })
    address: string;
}
