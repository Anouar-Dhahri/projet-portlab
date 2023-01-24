import express from "express";
import { findAll, create, update, remove, getOne } from '../controllers/Trade.Controller.js'
export const router = express.Router();

router.get('/get', findAll)
router.get('/get/:id', findAll)
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/remove/:id', remove)