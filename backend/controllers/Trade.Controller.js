import { Trade } from "../models/Trade.js";

export const findAll = async (req, res, next) => {
  const trades = await Trade.find();
  const imports =  await Trade.find({ type:'Import'});
  const exports =  await Trade.find({ type:'Export'});
  res.json({
    success: true,
    trades: trades,
    imports:imports,
    exports:exports
  })
}

export const getOne = async (req, res, next) => {
  const id = req.params.id;
  const trade = await Trade.findOne({ _id:id});
  res.json({
    success: true,
    trade: trade,
  })
}

export const create = async(req, res, next) => {
  try {
    const { 
      clientId, 
      shipId,
      escale, 
      designation, 
      tonnageTotal, 
      countryDepart, 
      countryDestination,
      type
    } = req.body;
    await Trade.find({clientId:clientId, shipId:shipId, escale: escale, designation: designation, tonnageTotal:tonnageTotal, countryDepart:countryDepart, countryDestination: countryDestination, type:type})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "Data already exist !"
        });
      }else {
        let trade = new Trade ({
          clientId:clientId, 
          shipId:shipId,
          escale: escale, 
          designation: designation, 
          tonnageTotal:tonnageTotal, 
          countryDepart:countryDepart, 
          countryDestination: countryDestination, 
          type:type
        });
        trade.save()
        .then(()=> {
          res.json({
            success: true,
            message: "The data was saved successfully."
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
    clientId, 
    shipId,
    escale, 
    designation, 
    tonnageTotal, 
    countryDepart, 
    countryDestination,
    type
  } = req.body;

  await Trade.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          clientId:clientId, 
          shipId:shipId,
          escale: escale, 
          designation: designation, 
          tonnageTotal:tonnageTotal, 
          countryDepart:countryDepart, 
          countryDestination: countryDestination, 
          type:type
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
  await Trade.deleteOne({ _id: id})
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