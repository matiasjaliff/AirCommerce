const express = require('express');
const { Users, Orders, Products } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');
const { AuthAdmin } = require('../controllers/middleware/auth'); //MiddleWare para corroborar si el user es un Admin o un simple plebello

// Se la da el rol a un usuario que solo puede ser brindado por un SuperAdmin

router.put('/giveRol/:id/:userId', AuthAdmin, async (req, res) => {
  try {
  const id = req.params.userId
  await Users.update({ isAdmin: true }, { where: { id } });
  res.status(201).send('Roles brindados al usuario');
  }catch(error){console.log(error)}
});

// Se la quita el rol a un usuario que solo puede ser quitado por un SuperAdmin
router.put('/takeRol/:id/:userId', AuthAdmin, async (req, res) => {
  try{
    const id = req.params.userId
    await Users.update({ isAdmin: false }, { where: { id } });
    res.status(201).send('Rol eliminado');
  }catch(error){console.log(error)}
});

// Le aparece todos los usuarios al SuperAdmin
router.get('/users/:id/:dni', AuthAdmin, async (req, res) => {
  try{
    const dni = req.params.dni
    const users = await Users.findOne({where: {dni}});
    res.status(200).send(users.dataValues);
  }catch(error){console.log(error)}
});

router.get('/:id', AuthAdmin, async (req, res) => {
  try{
    const users = await Users.findAll({
      // OP.NOT FUNCIONA PARA NO MOSTRARSE A UNO MISMO EN LA DB
      where: { id: { [Op.not]: req.params.id } }, order: ["name"]
    });
    res.status(200).send(users)
  }catch(error){console.log(error)}
});



module.exports = router;
