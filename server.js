const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const compression = require('compression');

const helpers = require('./utils/helpers.js');
const routes = require('./controllers');
const sequelize = require('./config/connection');


const app = express();
const port = process.env.PORT || 3001;

const sess = {
    secret: 'secret goes here or .env prop',
    cookie: { maxAge: 1800000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())

app.use(routes);

sequelize.sync({ force: false }).then(()=> {
    app.listen(port, () => console.log(`listening on ${port}`));
});