import { User } from './../models/User.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import { sendMail } from '../helpers/mail.helper.js';

export const findAll = async (req, res, next) => {
  const users = await User.find();
  res.json({
    success: true,
    users: users
  })
}

export const create = async(req, res, next) => {
  try {
    const { nom, prenom, email, password, type } = req.body;
    if(validator.isEmail(email)){
      await User.find({email:email})
      .then(result => {
        if(result.length >=1) {
          res.json({
            success: false,
            message: "User aleady exist !"
          });
        }else {
          bcrypt.hash(password, 10, (err, hash) => {
            if(err){
              res.json({
                success:false,
                message: "Error, unable to encrypt password !",
              })
            }else {
              const plainPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
              let user = new User ({
                nom:nom, 
                prenom:prenom,
                email:email, 
                password:hash,
                plainPassword:plainPassword,
                type: type
              });
              
              var message = {
                from: "admin@portlab.com",
                to: email,
                subject: "New Employe Account",
                html: "<p> Hello, <strong>"+nom+' '+prenom+"</strong> </p> <br> <p> Your Email & Password for your <strong>"+type+" </strong>account  are :<strong>"+email +"</strong> ****** Password: <strong>"+password+"</strong></p>"
              }

              user.save().then(()=> {
                let mail = sendMail(message);
                console.log(mail)
                res.json({
                  success: true,
                  message: "The user was created successfully."
                });
              }).catch(err => {
                res.json({
                  success: false,
                  message: `Cannot create This Account.`
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

export const update = async (req, res, next) => {
  const id = req.params.id;
  const { nom, prenom, email, password, type } = req.body;

  var message = {
    from: "admin@blueairline.com",
    to: email,
    subject: "Update Employe Account",
    html: "<p> Hello, <strong>"+nom+' '+prenom+"</strong> </p> <br> <p> Your Email & Password for your <strong>"+type+" </strong> account  are :<strong>"+email +"</strong> ****** Password: <strong>"+password+"</strong></p>"
  }

  await bcrypt.hash(password, 10, (err, hash) => {
    if(err){
      res.json({
        success:false,
        message: "Error, unable to encrypt password !",
      })
    }else {
      const plainPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();

      User.findByIdAndUpdate(
        {_id: id},
        {
          $set:{
            nom:nom, 
            prenom:prenom,
            email:email, 
            password:hash,
            plainPassword: plainPassword,
            type: type
          }
        },
        { new: true }
      )  
      .then(() => {
        let mail = sendMail(message);
        console.log(mail)
        res.json({
          success: true,
          message: "User was updated successfully."
        });
      })
      .catch(err => {
        res.json({
          success: false,
          message: `Cannot update user with id=${id}.`
        });
      });
    }
  })
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await User.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Userser was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete User with id=${id} !`
    })
  })
}