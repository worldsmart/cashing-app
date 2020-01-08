const model = (sequelize, Sequelize)=>{
    const Product = sequelize.define('product', {
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            required: true
        }
    });
    return Product;
};

module.exports = model;