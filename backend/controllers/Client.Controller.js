import { Client } from "../models/Client.js";

export const findAll = async (req, res, next) => {
    const clients = await Client.find();
    res.json({
      success: true,
      clients: clients
    })
  }
  
export const create = async(req, res, next) => {
  try {
    const { companie, representative, email, telephone, adress, country } = req.body;
    await Client.find({companie:companie, representative: representative, email: email, telephone:telephone, adress:adress, country: country})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "Client already exist !"
        });
      }else {
        let client = new Client ({
          companie:companie, 
          representative: representative, 
          email: email, 
          telephone:telephone, 
          adress:adress, 
          country: country
        });
        client.save()
        .then(()=> {
          res.json({
            success: true,
            message: "The Client was created successfully."
          });
        }).catch(err => {
          res.json({
            success: false,
            message: `Cannot add This Plane.`
          });
        });    
      }
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    });
  }
}

export const update = async (req, res, next) => {
  const id = req.params.id;
  const { companie, representative, email, telephone, adress, country } = req.body;

  await Client.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          companie:companie, 
          representative: representative, 
          email: email, 
          telephone:telephone, 
          adress:adress, 
          country: country
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The Client was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update the Client with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Client.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Client was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the Client with id=${id} !`
    })
  })
}