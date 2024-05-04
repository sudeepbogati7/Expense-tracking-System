
module.exports = {
  up: (queryInterface : any, Sequelize:any) => {
    return queryInterface.createTable('expenses', {
      expenseId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      expenseTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 50], // Assuming you want to enforce this validation through the migration
        },
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Assuming your User model table name is 'users'
          key: 'userId',
        },
      },
    });
  },

  down: (queryInterface : any, Sequelize : any) => {
    return queryInterface.dropTable('expenses');
  },
};