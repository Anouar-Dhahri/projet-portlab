import { Ship } from "../models/Ship.js";

export const findAll = async (req, res, next) => {
  const ships = await Ship.find();
  res.json({
    success: true,
    ships: ships
  })
}
  
export const create = async(req, res, next) => {
  try {
    const { clientId, nom, tonnage } = req.body;
    await Ship.find({clientId:clientId, nom: nom, tonnage: tonnage})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "The Ship already exist !"
        });
      }else {
        let ship = new Ship ({
          clientId:clientId, 
          nom: nom,
          tonnage: tonnage
        });
        ship.save()
        .then(()=> {
          res.json({
            success: true,
            message: "The Ship was created successfully."
          });
        }).catch(err => {
          res.json({
            success: false,
            message: `Cannot add This Ship.`
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
  const { clientId, nom, tonnage } = req.body;

  await Ship.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          clientId:clientId, 
          nom: nom,
          tonnage: tonnage
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The Ship was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot Ship the Port with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Ship.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Ship was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the Ship with id=${id} !`
    })
  })
}