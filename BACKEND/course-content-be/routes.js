const express = require('express');
const InstModel = require('./model');
const UserModel = require('./user.model');
const jwt = require("jsonwebtoken");
const auth = require('./auth.miidleware');

const instRouter = express.Router();

instRouter.post("/register",async (req, res)=>{
const payload = req.body
console.log(payload)
  const data = new UserModel(payload)
  await data.save()
  res.send({
      msg:"user registered successfully"
    })
});

instRouter.post("/login",async (req, res)=>{
    const {email, password} = req.body
      const data = await UserModel.findOne({email})
      if(data){
        const token = jwt.sign({UserID:data._id}, "instructor")
        if(data.password === password){
            // res.cookie("token", token, {maxAge:1000*60*3})
            res.send({
                msg:"user logged in successfully",
                token:token
            })
        }
      }
    });


instRouter.post("/add", auth, async(req, res)=>{
    const payload = req.body
    
    const data = new InstModel(payload)
    await data.save()
    res.status(201).send({
        msg:"courses added successfully"
    })
})

instRouter.get("/get", auth, async(req, res)=>{
    const data = await InstModel.find({UserID: req.body.UserID})
    res.send({
        msg:data
    })
});

   instRouter.patch("/update/:id",auth,async (req, res)=>{
          const id = req.params.id
          let payload = req.body
          const data = await InstModel.findByIdAndUpdate({_id:id}, payload)
          res.status(200).send({
              msg:"courses updated successfully"
          })
   })

   instRouter.delete("/delete/:id",auth,async (req, res)=>{
    const id = req.params.id
    const data = await InstModel.findByIdAndDelete({_id:id})
    res.status(200).send({
        msg:"courses deleted successfully"
    })
})

instRouter.get("/getback/:id", auth, async(req, res)=>{
    const id = req.params.id
    const data = await InstModel.find({_id: id})
    res.status(200).send({
        msg:data
    })
})


module.exports = instRouter;