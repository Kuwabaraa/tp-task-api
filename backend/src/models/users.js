module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: {
        msg: 'Le nom est déjà pris.'
      },

      validate: {
        len: {
          args: [2, 25], 
          msg: 'Le nom doit contenir entre 2 et 25 caractères. '
        }, 
        notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        notNull: { msg: 'Le nom est une propriété requise.'}
      }
    }, 

    taskToDo: {
      type:DataTypes.STRING,
      allowNull: false,
      get() {
          return this.getDataValue('taskToDo').split(',')
      },
      set(taskToDo) {
          this.setDataValue('taskToDo', taskToDo.join())
      },
      validate : {
        isTodoValid(value) {
          // if (!value) {
          //   throw new Error('Un utilisateur doit avoir au moins une tâche à faire.')
          // }
          if (value.split(',').length > 50) {
           throw new Error('Un utilisateur ne peut pas avoir plus de 50 tâches à faire.');    
          }
        }
      }
    },  

    taskAchieve: {
      type:DataTypes.STRING,
      allowNull: false,
      get() {
          return this.getDataValue('taskAchieve').split(',')
      },
      set(taskAchieve) {
          this.setDataValue('taskAchieve', taskAchieve.join())
      },
      validate: {
        isAchieveValid(value) {
            // if (!value) {
            //   throw new Error('Un utilisateur doit au moins avoir une tâche achevée.')
            // }
            if(value.split(',').length > 50) {
              throw new Error('Un utilisateur ne peut pas avoir plus de 50 tâches achevées.')
            }
        }
      }
    }
  }, {
    timestamps:true,
    createAt: 'created',
    updateAt:false
  })
}