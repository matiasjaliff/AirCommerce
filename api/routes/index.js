const express = require('express');

const router = express.Router();
const usersRouter = require('./Users');
const productsRouter = require('./Products');
const ordersRouter = require('./Orders');
const reviewsRouter = require('./Reviews');
const adminRouter = require('./Admin');

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);
router.use('/admin', adminRouter);

router.get('/', (req, res) => {
  res.send('AirCommerce Is Alilve!');
});

module.exports = router;
