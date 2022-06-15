const { Users } = require('../db/sequelize');
const auth = require('../auth/auth')


module.exports = (app) => {
    app.delete('/api/users/:id', auth,  (req, res) => {
        Users.findByPk(req.params.id).then(us => {
            if (us === null) {
                const message = `L'utilisateur n\'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({ message })
            }
            const userDeleted = us;
            return Users.destroy({
                where: { id: us.id }
            })
            .then(_ => {
                const message = `L'utilisateur' avec l'identifiant n'° ${userDeleted.id} a bien été supprimé.`
                res.json({ message, data: userDeleted })
            })
        })
        .catch(error => {
            const message = `L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        })
    })
}