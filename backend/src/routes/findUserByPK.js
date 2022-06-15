const { Users } = require('../db/sequelize');
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/users/:id', auth, (req, res) => {
        Users.findByPk(req.params.id)
        .then(us => {
            const message = `Un utilisateur a bien été trouvé.`
            res.json({ message, data: us})
        }).catch(error => {
            const message = `L'utilisateur n\'a pas pu être trouvé.`
            res.status(500).json({ message, data:error })
        })
    })
}