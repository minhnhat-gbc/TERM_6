const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//http://localhost:3000/restaurants
router.get('/restaurants', async (req, res) => {
    try {
        let restaurants = await Restaurant.find()
        res.status(500).send(restaurants)
    } catch (e) {
        res.status(500).send(e)
    }
})

//http://localhost:3000/restaurants/cuisine/:nation


router.get('/restaurants/cuisine/:nation',async (req, res) => {
    const restau = await Restaurant.find({cuisine: req.params.nation}).select("city cuisine");

    try {
        if(restau.length != 0){
          res.send(restau);
        }else{
          res.send(JSON.stringify({status:false, message: "No data found"}))
        }
      }catch (e){
        res.status(500).send(e)
    }

})


router.post('/restaurants', async (req, res) => {
    let restaurant = new Restaurant({
        address: [{
            building: req.body.building,
            street: req.body.street,
            zipcode: req.body.zipcode,

        }],
        city: req.body.city,
        cuisine: req.body.cuisine,
        name: req.body.name,
        city: req.body.city,
        restaurant_id: req.body.restaurant_id,
    })
    try {
        let newRestaurant = await restaurant.save()
        res.status(201).send(restaurants)
    } catch (e) {
        res.status(400).send(e)
    }
})




module.exports = router