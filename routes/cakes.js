const express = require("express");
const {CakeModel, validateCake} = require("../models/cakeModel");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    // SELECT * FROM cakes LIMIT 0,5;
    let data = await CakeModel
    .find({})
    .limit(5)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/", async(req,res) => {
  let validBody = validateCake(req.body);
  // .error -> מיוצר אם יש טעות בוולדזציה של ג'וי
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    let cake = new CakeModel(req.body);
    await cake.save();
    res.status(201).json(cake);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})


router.put("/:id", async(req,res) => {
  let validBody = validateCake(req.body);
  // .error -> מיוצר אם יש טעות בוולדזציה של ג'וי
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{
    let id = req.params.id;
    let data = await CakeModel.updateOne({_id:id},req.body);
    // modfiedCount:1 -> אומר שהצליח למחוק
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", async(req,res) => {
  try{
    let id = req.params.id;
    let data = await CakeModel.deleteOne({_id:id});
    // deletedCount:1 -> אומר שהצליח למחוק
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

module.exports = router;