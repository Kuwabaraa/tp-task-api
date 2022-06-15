const { ValidationError, UniqueConstraintError } = require('sequelize');
const { Users } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/users/:id', auth,  (req, res) => {
    const id = req.params.id
    console.log(id, req.body);
    Users.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Users.findByPk(id).then(us => {
        if (us === null) {
          const message = `L'utilisateur demandé n\'existe pas. Réessayez avec un autre identifiant`;
          return res.status(404).json({ message })
        }
        const message = `L'utilisateur ${ us.name } a bien été modifié.`
        res.json({ message, data: us })
      })
    })
    .catch(error => {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error })
        }

        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: 'error.message', data: error })
        }
        const message = `L'utilisateur n\'a pas pu être modifié. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
    })
  })
}
