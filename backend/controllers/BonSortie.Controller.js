import { BonSortie } from "../models/BonSortie.js";

export const findAll = async (req, res, next) => {
  const bonSorties = await BonSortie.find();
  res.json({
    success: true,
    bonSorties: bonSorties,
  })
}
  
export const create = async(req, res, next) => {
  try {
    const { 
      TradeId, 
      tonnageEntree, 
      tonnageRestant, 
      dateLimiteSortie, 
      tonnageAEnlever, 
    } = req.body;
    await BonSortie.find({TradeId:TradeId, tonnageEntree: tonnageEntree, tonnageRestant: tonnageRestant, dateLimiteSortie:dateLimiteSortie, tonnageAEnlever:tonnageAEnlever})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "Data already exist !"
        });
      }else {
        let bonEntree = new BonSortie ({
          TradeId:TradeId, 
          tonnageEntree: tonnageEntree, 
          tonnageRestant: tonnageRestant, 
          dateLimiteSortie:dateLimiteSortie, 
          tonnageAEnlever:tonnageAEnlever
        });
        bonEntree.save()
        .then(()=> {
          res.json({
            success: true,
            message: "The data was added successfully."
          });
        }).catch(err => {
          res.json({
            success: false,
            message: `Cannot add This data.`
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
    tonnageEntree, 
    tonnageRestant, 
    dateLimiteSortie, 
    tonnageAEnlever, 
  } = req.body;

  await BonSortie.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          tonnageEntree: tonnageEntree, 
          tonnageRestant: tonnageRestant, 
          dateLimiteSortie:dateLimiteSortie, 
          tonnageAEnlever:tonnageAEnlever
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
  await BonSortie.deleteOne({ _id: id})
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