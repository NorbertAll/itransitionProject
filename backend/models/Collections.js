module.exports = (sequelize, DataTypes)=>{
    const Collections = sequelize.define("Collections", {
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
            type: DataTypes.STRING,
            allowNull:false
        },
        topic: {
            type: DataTypes.STRING,
            allowNull:false
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false
        },
        
    });
    Collections.associate = (models)=>{
        Collections.hasMany(models.Items, {
            onDelete: "cascade",
        });

    }
    
   return Collections;
};