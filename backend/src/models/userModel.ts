import { Table, Column, Model, DataType, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table({
    tableName: 'users',
    timestamps: true,
})

export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    })
    userId!: number;

    @Column({
        type: DataType.STRING,
        validate: {
            len: [5, 50],
        },
    })
    fullName!: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    })
    password !: string;

    @BeforeCreate
    static async hashPassword(instance: User): Promise<void> {
        if (instance.changed('password')) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(instance.password, saltRounds);
            instance.password = hashedPassword;
        }
    }
}
