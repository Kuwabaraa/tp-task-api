const { Users } = require('../db/sequelize');
const { Op } = require('sequelize');
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/users', auth,  (req, res) => {
    if (req.query.name) {
        const name = req.query.name;
        const limit = parseInt(req.query.limit) || 50
        if (name.length < 2) {
            const message = `L'utilisateur doit contenir au moins deux caractères.`
            return res.status(400).json({ message })
        }
        return Users.findAndCountAll({ 
            where: { 
                name: {
                    [Op.like]: `%${name}%`
                } 
            }, 
            order:['name'],
            limit: limit
        })
        .then(({count, rows}) => {
            const message = `Il y'a ${count} ${count <= 1 ? 'utilisateur qui correspond': 'utilisateurs qui correspondent'} au terme de recherche ${name.toUpperCase()}.`
            res.json({ message, data: rows })
        })
    } else {
        Users.findAll({ order: ['name'] })
        .then(us => {
            const message = `La liste des utilisateurs a bien été récupérée !`
            res.json({ message, data: us})
        })
        .catch(error => {
            const message = `La liste des utilisateurs n'a pas pu être recupérée. Réessayez dans quelques instants.`
            res.status(500).json({message, data:error})
        })
    }
  })
}