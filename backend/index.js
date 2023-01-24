import express from 'express';
const app = express()
import cors from 'cors'
import dotenv from'dotenv';
const port = process.env.PORT || 8080;

import dbConnect from './configs/dbConnection.js';

import { router as authRoute } from './routes/Auth.routes.js'
import { router as adminRoute } from './routes/Admin.routes.js'
import { router as dataRoute } from './routes/Data.routes.js'
import { router as userRoute } from './routes/Users.routes.js'
import { router as portRoute } from './routes/Ports.routes.js'
import { router as tracesRoute } from './routes/History.routes.js'
import { router as shipsRoute } from './routes/Ships.routes.js'
import { router as clientsRoute } from './routes/Clients.routes.js'

import { router as tradesRoute } from './routes/Trades.routes.js'
import { router as bonentreeRoute } from './routes/BonEntree.routes.js'
import { router as bonsortieRoute } from './routes/BonSortie.routes.js'
dotenv.config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/data', dataRoute);
app.use('/api/users', userRoute);
app.use('/api/ports', portRoute);
app.use('/api/traces', tracesRoute);
app.use('/api/ships', shipsRoute);
app.use('/api/clients', clientsRoute);
app.use('/api/trades', tradesRoute);
app.use('/api/bonentrees', bonentreeRoute);
app.use('/api/bonsorties', bonsortieRoute);
dbConnect();

app.get('/', (req, res) => res.send('The server is working !'));
app.listen(port, () => console.log(`Server is running on port ${port}!`));