import { Table, Column, Model, DataType, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table({
    tableName: 'users',
    timestamps: true,
})

export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    })
    id!: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        validate: {
            isAlphanumeric: true,
            len: [3, 25],
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
