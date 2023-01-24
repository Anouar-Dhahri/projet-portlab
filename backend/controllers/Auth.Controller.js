import { User } from './../models/User.js'
import { History } from '../models/History.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { sendMail } from './../helpers/mail.helper.js'

export const login = async (req, res, next) => {
  try {
    const  { email, password } = req.body;
    if(validator.isEmail(email)){
      await User.find({email:email})
      .then((result) => {
        if(result.length === 0) {
          res.json({
            success:false,
            message:"User not found !"
          });
        }else {
          result.map(item => {
            bcrypt.compare(password, item.password).then(function(match) {
              if(match) {
                const token = jwt.sign({id:item._id, nom:item.nom, prenom:item.prenom, email:item.email}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
                const history = new History({
                  userId:item._id,
                  action: 'Login'
                })
                history.save();
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
  const plainPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
  if(validator.isEmail(email)){
    await bcrypt.hash(password, 10, (err, hash) => {
      if(err){
        res.json({
          success:false,
          message: "Error, unable to encrypt password !",
        })
      }else {
        User.findByIdAndUpdate(
          {_id: id},
          { 
            $set:{
              nom:nom, 
              prenom: prenom, 
              email:email, 
              password:hash, 
              plainPassword: plainPassword
            }
          },
          {new:true}
        ).then(() => {
          res.json({
            success: true,
            message: "Your Profil was Updated successfully."
          });
        }).catch((error) => {
          res.json({
            success: false,
            message: error
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

}

export const forgotpassword = async( req, res, next ) => {
  const { email } = req.body;

  await User.find({email:email})
  .then((result) => {
    if(result.length === 0) {
      res.json({
        success:false,
        message:"This email "+email+" don't exist, please check your email",
      });
    }else {
      result.map(item => {
        let plainpass = CryptoJS.AES.decrypt(item.plainPassword, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
        var message = {
          from: "portlab@application.com",
          to: email,
          subject: "Forgot Password",
          html: "<p> Hello, <strong>"+item.nom+' '+item.prenom+"</strong> </p> <br> <p> Your Password :<strong>"+plainpass +"</strong></p>"
        }
        let mail = sendMail(message);
        res.json({
          success: true,
          message: "Check your email to find your password"
        })
      })
    }
  })
}

export const logout = async( req, res, next ) => {
  const userId = req.body.userId;
  const history = new History({
    userId:userId,
    action: 'Logout'
  })
  history.save().then(() => {
    res.json({
      success:true
    });
  })
}