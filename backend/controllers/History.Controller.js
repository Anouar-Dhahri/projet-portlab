import { History } from './../models/History.js'

export const findAll = async (req, res, next) => {
  const history = await History.find();
  res.json({
    success: true,
    history: history
  })
}
    
export const create = async(req, res, next) => {
  try {
    const { userId } = req.body;
    let trace = new History ({
      userId:userId, 
    });
    trace.save()
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
  } catch (error) {
    res.json({
      success: false,
      message: error
    });
  }
}