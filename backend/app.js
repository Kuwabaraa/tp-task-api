const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors')
app
    .use(bodyParser.json())
    .use(cors())
    
    sequelize.initDb();

    app.get('/', (req, res) => {
        res.json('Hello, Heroku! ')
    })
    
    require('./src/routes/createUsers')(app);
    require('./src/routes/findAllUsers')(app);
    require('./src/routes/deleteUsers')(app);
    require('./src/routes/findUserByPK')(app);
    require('./src/routes/updateUsers')(app);
    require('./src/routes/login')(app);

app.use(({res}) => {
    const message = `Impossible de trouver la ressource de votre demande ! Vous pouvez essayer une autre URL !`;
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))