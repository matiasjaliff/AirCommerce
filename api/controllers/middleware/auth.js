const Users = require('../../models/Users');

// Verificacion de que el usuario este logeado en AirCommerce

const Auth = (req, res, next) => {
  if (!Users) return res.status(401).send('Unauthorized,Loggeate primero');
  next();
};

// Verificacion de que el usuario sea SuperAdmin en AirCommerce

const AuthAdmin = (req, res, next) => {
  Users.findOne({ where: { id: req.params.id } }).then((admin) => {
    if (!admin.dataValues.superAdmin)
      return res
        .status(401)
        .send('Unauthorized, No tenes los permisos necesarios ');
  });

  next();
};

module.exports = { Auth, AuthAdmin };
