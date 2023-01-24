import express from "express";
import { login, profile, forgotpassword, logout } from "../controllers/Auth.Controller.js";
export const router = express.Router();

router.post('/login', login)

router.post('/logout', logout)

router.put('/profile/:id', profile)

router.post('/forgotpassword', forgotpassword)
