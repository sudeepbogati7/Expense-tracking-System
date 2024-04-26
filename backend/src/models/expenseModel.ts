import { Table, Column, Model, DataType, BeforeCreate } from 'sequelize-typescript';

@Table({
    tableName: 'expenses',
    timestamps: true,
})

export class Expenses extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    expenseId!: number;

    @Column({
        type: DataType.STRING,
        validate: {
            len: [5, 50],
        },
    })
    expenseTitle!: string;

    @Column({
        type: DataType.NUMBER,
        allowNull : false
    })
    amount!: number;
}   
