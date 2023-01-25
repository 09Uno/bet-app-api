import { NextGamesService } from "./nextGamesService";
import { Request, Response } from "express";





class NextGamesController {


    async handle(req: Request, res: Response) {



        const nextGamesService = new NextGamesService();

        const games = await nextGamesService.execute();

        let i = 0;
        var data1 = [];
        while (i < games.length) {
            data1.push(games.slice(i, i + 6));
            i += 6;
        }

        const data = data1;

        return res.json(data);



    }




}



export { NextGamesController }