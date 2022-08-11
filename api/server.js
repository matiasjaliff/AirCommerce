const express = require('express');
const app = express();
const cors = require('cors');
const volleyball = require('volleyball');
const routes = require('./routes');
const db = require('./db');
const { Users, Products, Orders } = require('./models');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const LocalStrategy = require('passport-local').Strategy;

const PORT = 8080;

app.use(volleyball);
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'air' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      Users.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          user.setHash(password, user.salt).then((hash) => {
            if (hash != user.password) {
              return done(null, false);
            }
            done(null, user);
          });
        })
        .catch(done);
    }
  )
);

const authUser = async (request, accessToken, refreshToken, profile, done) => {
  const user = await Users.findOne({
    where: {
      email: profile.email,
    },
  });
  return done(null, profile);
};

GOOGLE_CLIENT_ID ='714031971248-tujqisu7g2u6lh1mlcupafnldjeoml31.apps.googleusercontent.com';
GOOGLE_CLIENT_SECRET = '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';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/users/auth/google/callback',
      passReqToCallback: true,
    },
    authUser
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Users.findByPk(id).then((user) => done(null, user));
});

app.use('/api', routes);
app.use('/', (req, res, next) => res.redirect('/api'));

db.sync({ force: false})
  .then(() => {
    app.listen(PORT, (req, res, next) => {
      console.log(`AirCommerce on port ${PORT}`);
    });
  })
  .catch(console.error);
