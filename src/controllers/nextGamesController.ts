import { NextGamesService } from "../services/nextGamesService";
import { Request, Response } from "express";

var gamesToJason: string | any[] = [];
const nextGamesService = new NextGamesService();

class NextGamesController {
    constructor() {
        this.updateData(); 
    }

    updateData() {
        setInterval(async () => {
            const games = await nextGamesService.execute();
            gamesToJason = games;
        }, 60000);
    }

    async handle(req: Request, res: Response) {
        while (gamesToJason.length === 0) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Aguarda 100ms
        }

        return res.json(gamesToJason);
    }
}

export { NextGamesController }
