import express from "express";
import { login, register, profile } from './../controllers/Admin.Controller.js'
export const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.put('/profile/:id', profile)

