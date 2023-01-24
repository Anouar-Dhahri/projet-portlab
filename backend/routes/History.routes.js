import express from "express";
import { findAll, create } from './../controllers/History.Controller.js'
export const router = express.Router();

router.get('/get', findAll)
router.post('/create', create)