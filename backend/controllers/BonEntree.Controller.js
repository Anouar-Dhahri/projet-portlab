import { BonEntree } from "../models/BonEntree.js";

export const findAll = async (req, res, next) => {
  const bonEntrees = await BonEntree.find();
  res.json({
    success: true,
    bonEntrees: bonEntrees,
  })
}
  
export const create = async(req, res, next) => {
  try {
    const { 
      TradeId, 
      tonnageEntree, 
      tonnageRestant, 
      dateLimiteEntree, 
      tonnageAEntree, 
    } = req.body;
    await BonEntree.find({TradeId:TradeId, tonnageEntree: tonnageEntree, tonnageRestant: tonnageRestant, dateLimiteEntree:dateLimiteEntree, tonnageAEntree:tonnageAEntree})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "Data already exist !"
        });
      }else {
        let bonEntree = new BonEntree ({
          TradeId:TradeId, 
          tonnageEntree: tonnageEntree, 
          tonnageRestant: tonnageRestant, 
          dateLimiteEntree:dateLimiteEntree, 
          tonnageAEntree:tonnageAEntree
        });
        bonEntree.save()
        .then(()=> {
          res.json({
            success: true,
            message: "The Bon Entree was added successfully."
          });
        }).catch(err => {
          res.json({
            success: false,
            message: `Cannot add This Bon Entréé.`
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
  const { 
    TradeId, 
    tonnageEntree, 
    tonnageRestant, 
    dateLimiteEntree, 
    tonnageAEntree, 
  } = req.body;

  await BonEntree.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          tonnageEntree: tonnageEntree, 
          tonnageRestant: tonnageRestant, 
          dateLimiteEntree:dateLimiteEntree, 
          tonnageAEntree:tonnageAEntree
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The data was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update this data with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await BonEntree.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Data was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the Data with id=${id} !`
    })
  })
}