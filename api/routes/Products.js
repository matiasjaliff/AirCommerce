const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Users, Products, Orders, Reviews } = require('../models');
const { findOne } = require('../models/Users');
const multer  = require('multer');
const fs = require('fs');


//This code allows you to save a file, which was sent via frontend form, on the server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/utils/img')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })


router.get('/', async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).send(products);
  } catch (error) {res.status(400).send(error)}
});

router.get('/:search', async (req, res) => {
  try {
    let search = req.params.search;
    search = search.toLowerCase();
    const product = await Products.findAll({
      where: {[Op.or]: [{ barcode: search },{ brand: search }, { model: search }, { color: search }]},
    });
    res.status(200).send(product);
  } catch (error) {console.log(error)}
});

router.get('/sortBy/:type/:search', async (req, res) => {
  try {
    let sort = req.params.type;
    sort = sort.slice(1)
    let search = req.params.search;
    search = search.toLowerCase();
    if(req.params.type.includes("+")){
    const sortProduct = await Products.findAll({
      where: {[Op.or]: [{ brand: search }, { model: search }, { color: search }]},
      order: [sort],
    });
    res.status(200).send(sortProduct)}
    if(req.params.type.includes("-")){
    const sortProduct = await Products.findAll({
      where: {[Op.or]: [{ brand: search }, { model: search }, { color: search }]},
      order: [[sort,'DESC']],
    });
    res.status(200).send(sortProduct)}
  } catch (error) {console.log(error)}
});

router.get('/sortBy/:type', async (req, res) => {
  try {
    let sort = req.params.type;
    sort = sort.slice(1)
    if(req.params.type.includes("+")){
      const sortProduct = await Products.findAll({order: [sort]});
      res.status(200).send(sortProduct);
    }
    if(req.params.type.includes("-")){
      const sortProduct = await Products.findAll({order: [[sort,'DESC']]});
      res.status(200).send(sortProduct);
    }
  } catch (error) {console.log(error)}
});

router.get('/single/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const product = await Products.findOne({ where: { id } });
    res.status(200).send(product);
  } catch (error) {res.status(400).send(error)}
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
 
    const product = await Products.create(JSON.parse(JSON.stringify(req.body)));
    fs.rename(req.file.path ,`src/utils/img${product.url_path}`, err => {if (err) console.log(err)})
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
  
});

router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ where: { id } });
    const updatedProduct = await Products.update(req.body, {where: { id: product.id }})
    fs.rename(req.file.path ,`src/utils/img${product.url_path}`, err => {if (err) console.log(err)})
    res.status(201).send(product)
  } catch (error) {res.status(400).send(error)}
});

module.exports = router;
