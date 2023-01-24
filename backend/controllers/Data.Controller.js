import { User } from '../models/User.js'
import { Port } from '../models/Port.js'
import { Client } from '../models/Client.js'
import { Ship } from '../models/Ship.js'
import { Trade } from '../models/Trade.js'
import { BonEntree } from '../models/BonEntree.js'
import { BonSortie } from '../models/BonSortie.js'

export const counter = async (req, res, next) => {
  const users = await User.find().count();
  const ports = await Port.find().count();
  const clients = await Client.find().count();
  const ships = await Ship.find().count();
  const imports =  await Trade.find({ type:'Import'}).count();
  const exports =  await Trade.find({ type:'Export'}).count();
  const bonEntrees = await BonEntree.find().count();
  const bonSorties = await BonSortie.find().count();

  res.json({
    success: true,
    users: users,
    ports:ports,
    clients: clients,
    ships:ships,
    imports:imports,
    exports:exports,
    bonEntrees:bonEntrees,
    bonSorties:bonSorties
  })
}