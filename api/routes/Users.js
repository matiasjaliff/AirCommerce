const express = require('express');
const router = express.Router();
const { Users, Products, Orders, Reviews } = require('../models');
const passport = require('passport');
const { Auth } = require('../../api/controllers/middleware/auth');

// Se crea el usuario y se verifica que no tiene ningun otro igual

router.post('/register', async (req, res, next) => {
  try {
    const { email } = req.body;
    const dataUser = await Users.findOrCreate({
      where: { email },
      defaults: req.body,
    });
    if (!dataUser[1]){return res.status(404).send('Fail')} 
    res.status(201).send(dataUser)
  
  } catch (error) {
    res.status(400).send(error);
  }
});

// Podemos acceder a localhost:8080/api/users y ver los usuarios

router.get('/', (req, res) => {
  Users.findAll()
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Login de un usuario

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

// Editar tu usuario

router.put('/edit', async (req, res) => {
  try {
    const updateUser = await Users.update(req.body, {
      where: { dni: req.body.dni },
    });
    console.log(req.body);
    res.status(201).send(updateUser);
  } catch (error) {
    console.log(error);
  }
});

//Mostrar al usuario Logeado ( Actualizar con LocalStorage )

router.get('/:id', async (req, res) => {
 try{
const users = await Users.findOne({where: {id: req.params.id}})
 res.send(users);
 } catch (error) {
  console.log(error);
 }
})

//Logout

router.post('/logout', (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

//Obtener todas las ordenes de compra del Usuario

//(Terminar de pensar con El equipo debido que fue una idea autonoma , pero creo que funciona jaja)
//(Tambien Hablar acerca de los modelos, en la parte de Orders, personalmente siento que faltan 2 partes una en la cual muestra todos los productos que contiene la orden , y otra el precio total de la misma.)

router.get('/orders', Auth, async (req, res) => {
  try {
    const orders = await Orders.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* router.get('/orders/:id', Auth, async (req, res) => {
try{
const orders= await Orders.findAll({
  where:{
    userNumber:req.params.id
  }
})
const products= await Products
}
}); */

// Inicio de login con authenticator de google
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Continuacion de login con authenticator de google
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/login',
  })
);

module.exports = router;
