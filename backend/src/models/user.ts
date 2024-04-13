import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../index';


class User extends Model {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public password !: string;
    public readonly createdAt!: Date;
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            isAlphanumeric: true,
        },
        allowNull: false,
    }
},
    {
        sequelize,
        modelName: 'User'
    }
);

export default User;