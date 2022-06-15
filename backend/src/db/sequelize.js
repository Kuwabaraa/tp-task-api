const { Sequelize, DataTypes } = require('sequelize')
const UsersModel = require('../models/users')
const LogsModel = require('../models/logs')
const users = require('./mock-users')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('task', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2'
  },
  logging: false
})
  
const Users = UsersModel(sequelize, DataTypes)
const Logs =  LogsModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    users.map(task => {
      Users.create({
        name: task.name,
        taskToDo: task.taskToDo,
        taskAchieve: task.taskAchieve,
      }).then(task => console.log(task.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
    
    bcrypt.hash('coucou', 10)
    .then(hash => {
      Logs.create ({
      username:'root',
      password: hash
      })
    .then(logs => console.log(logs.toJSON()))
    })
  })
}

module.exports = { 
  initDb, Users, Logs
}


