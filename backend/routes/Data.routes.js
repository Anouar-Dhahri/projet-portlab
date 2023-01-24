import express from "express";
import { counter } from './../controllers/Data.Controller.js'
export const router = express.Router();

router.get('/counter', counter)
