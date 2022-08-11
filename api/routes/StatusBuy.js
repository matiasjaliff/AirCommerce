const express = require('express');
const { DetailBuy } = require('../models');
const { AuthAdmin } = require('../controllers/middleware/auth');
const router = express.Router();

//Ruta para mostrar todas las ordenes de compras de los usuarios

router.get('/allOrders', AuthAdmin, (req, res) => {
  DetailBuy.findAll().then((todos) => res.send(todos));
});

//Ruta que solo te muestran las ordenes pendientes

router.get('/pending', AuthAdmin, (req, res) => {
  DetailBuy.findAll({
    where: {
      state_buy: 'pending',
    },
  }).then((todos) => res.send(todos));
});

//Ruta para actualizar el estado de la orden
//Nuevo_estado hace referencia al input que enviara el Front


router.put('/pendings/:id', AuthAdmin, async (req, res) => {
  let compra = await DetailBuy.findByPk(req.params.id);
  await compra.update(
    { state_buy: req.body.nuevo_estado },
    { where: { id: req.params.id } }
  );
  await compra.save();
  res.send('Cambio en el estado efectuado correctamente');
});
