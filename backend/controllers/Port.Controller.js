import { Port } from "../models/Port.js";

export const findAll = async (req, res, next) => {
    const ports = await Port.find();
    res.json({
      success: true,
      ports: ports
    })
  }
  
export const create = async(req, res, next) => {
  try {
    const { nom, ville, country } = req.body;
    await Port.find({nom:nom, country: country, ville: ville})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "The port already exist !"
        });
      }else {
        let port = new Port ({
          nom:nom, 
          ville: ville,
          country: country
        });
        port.save()
        .then(()=> {
          res.json({
            success: true,
            message: "The Port was created successfully."
          });
        }).catch(err => {
          res.json({
            success: false,
            message: `Cannot add This Port.`
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
  const { nom, ville, country } = req.body;

  await Port.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          nom:nom, 
          ville: ville,
          country: country
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The Port was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update the Port with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Port.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Port was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the Port with id=${id} !`
    })
  })
}