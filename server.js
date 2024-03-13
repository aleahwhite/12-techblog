require('dotenv').config();
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
