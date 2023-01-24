import express from "express";
import { findAll, create, update, remove } from '../controllers/Client.Controller.js'
export const router = express.Router();

router.get('/get', findAll)
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/remove/:id', remove)