const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Users, Products, Orders, Reviews } = require('../models');

// RUTA PARA RECUPERAR EL CARRITO QUE ESTA GUARDADO EN LA DB CUANDO EL USUARIO HACE LOGIN

router.get('/load/:id', (req, res) => {
  const id = req.params.id;
  Orders.findOne({
    where: {
      userNumber: id,
      fullfilled: false,
    },
  })
    .then((order) => {
      res.status(200).send(order);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//RUTA PARA RECUPERAR PRODUCTO ADQUIRIDO QUE ESTA GUARDADO EN LA DB CUANDO EL USUARIO VA AL HISTORY
router.get('/purchase/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newOrders = [];
    const order = await Orders.findAll({
      where: {
        userNumber: id,
        fullfilled: true,
      },
      order: ['createdAt'],
    });
    order.forEach((or) =>
      or.dataValues.products_buy.forEach((o) => newOrders.push(o))
    );
    console.log(newOrders);

    res.status(200).send(newOrders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// RUTA PARA SALVAR CARRITO EN DB CUANDO EL USUARIO HACE LOGOUT

router.put('/save', (req, res) => {
  Orders.update(
    {
      products_buy: req.body.products_buy,
      userNumber: req.body.userNumber,
    },
    {
      where: {
        userNumber: req.body.userNumber,
        fullfilled: false,
      },
    }
  )
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
    });
});

// RUTA PARA HACER EL CHECKOUT DEL CARRITO

router.put('/checkout', (req, res) => {
  Orders.update(
    {
      products_buy: req.body.products_buy,
      userNumber: req.body.userNumber,
      fullfilled: true,
    },
    {
      where: {
        userNumber: req.body.userNumber,
        fullfilled: false,
      },
    }
  )
    .then(() => res.sendStatus(200))

    .catch((error) => console.log(error));
});

// RUTA PARA CREAR NUEVA ORDEN VACÍA CUANDO SE REGISTRA NUEVO USUARIO O CUANDO SE HACE CHECKOUT DE CARRITO

router.post('/add', (req, res) => {
  Orders.create({
    userNumber: req.body.userNumber,
  })
    .then((newOrder) => {
      res.status(201).send(newOrder);
    })
    .catch((error) => console.log(error));
});


router.delete('/remove', async (req, res) => {
  try {
    const productId = req.body.id;
    await Orders.destroy({
      where: { productNumber: productId  },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
