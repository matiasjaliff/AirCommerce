const express = require("express");
const {Op} = require("sequelize")
const router = express.Router()
const {Users, Products, Orders, Reviews} = require("../models")

router.get("/",async(req,res)=>{
    try{
       const reviews = await Reviews.findAll()
       res.status(200).send(reviews)
    }catch (error){ res.status(400).send(error)};
})

router.post("/:id", async(req,res)=>{
    try{
        const productId = req.params.id
        const userdId = req.body
        const product= await Products.findOne({where:{id:productId}})
        const review = await Reviews.create(req.body)
        await review.setProduct(productId)
        await review.setUser(userdId)
        res.status(201).send(review)
    }catch (error){res.status(400).send(error)};
})

module.exports = router