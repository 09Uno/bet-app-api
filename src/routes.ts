import { Router, Request, Response } from "express";
import { NextGamesController } from "./controllers/nextGamesController";

// this file its responsible for manage the routers of the application.

const router = Router();


router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})



router.get('/games', new NextGamesController().handle)
router.get('/teams', new NextGamesController().handle)

export {router};