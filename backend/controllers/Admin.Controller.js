import { Admin } from './../models/Admin.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async(req, res, next) => {
  try {
    const { nom, prenom, email, password } = req.body;
    if(validator.isEmail(email)){
      await Admin.find({email:email})
      .then(result => {
        if(result.length >=1) {
          res.json({
            success: false,
            message: "Email already Exist !"
          });
        }else {
          bcrypt.hash(password, 10, (err, hash) => {
            if(err){
              res.json({
                success:false,
                message: "Error, unable to encrypt password !",
              })
            }else {
              let admin = new Admin({
                nom:nom, 
                prenom:prenom, 
                email:email, 
                password:hash
              })
              admin.save().then(()=> {
                res.json({
                  success: true,
                  message: "Admin was created successfully."
                });
              }).catch(err => {
                res.json({
                  success: false,
                  message: `Cannot create This Admin.`
                });
              })
            }
          })
        }
      })
    }else {
      res.json({                  
        success:false,
        message: "Invalid email format !"
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error
    });
  }
}

export const login = async (req, res, next) => {
  try {
    const  { email, password } = req.body;
    if(validator.isEmail(email)){
      await Admin.find({email:email})
      .then((result) => {
        if(result.length === 0) {
          res.json({
            success:false,
            message:"User Not Found !",
          });
        }else {
          result.map(item => {
            bcrypt.compare(password, item.password).then(function(match) {
              if(match) {
                const token = jwt.sign({id:item._id, nom:item.nom, prenom:item.prenom, email:item.email}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
                res.json({
                  success:true,
                  message:"Welcome "+item.nom+' '+item.prenom,
                  user: item,
                  token:token
                })
              }else {
                res.json({
                  success:false,
                  message:"Wrong password. try again !"
                })
              }
            });
          })
        }
      })
    }else {
      res.json({
        success:false,
        message: "Invalid email format !"
      })
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal error"
    })
  }
}

export const profile = async ( req, res, next ) => {
  const id = req.params.id;
  const { nom, prenom, email, password } = req.body;

  if(validator.isEmail(email)){
    await bcrypt.hash(password, 10, (err, hash) => {
      if(err){
        res.json({
          success:false,
          message: "Error, unable to encrypt password !",
        })
      }else {
        Admin.findByIdAndUpdate(
          { _id:id }, 
          {
            $set: {
              nom:nom,
              prenom:prenom,
              email:email,
              password:hash
            }
          }, 
          {new:true})
          .then((docs) => {
          res.json({
            success: true,
            message: "Profil was updated successfully.",
            user:docs
          });
        })
        .catch(err => {
          res.json({
            success: false,
            message: `Cannot update Profil with id=${id}.`
          });
        });
      }
    })
  }else {
    res.json({                  
      success:false,
      message: "Invalid email format !"
    })
  }
}