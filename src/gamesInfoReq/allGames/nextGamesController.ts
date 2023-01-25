import { NextGamesService } from "./nextGamesService";
import { Request, Response } from "express";





class NextGamesController {


    async handle(req: Request, res: Response) {



        const nextGamesService = new NextGamesService();

        const games = await nextGamesService.execute();

        return res.json(games);



    }




}



export { NextGamesController }