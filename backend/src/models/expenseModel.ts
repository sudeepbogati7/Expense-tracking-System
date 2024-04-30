import { Table, Column, Model, DataType, BeforeCreate , HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from './userModel';

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
            len: [2, 50],
        },
    })
    expenseTitle!: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull : false
    })
    amount!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category !: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull : false,
    })
    userId !: number
    
    @BelongsTo(() => User)
    user !: User
    
}

