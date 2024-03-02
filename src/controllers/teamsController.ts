import { TeamsService } from "../services/teamsService";
import { Request, Response } from "express";

class TeamsController {
    async handle(req: Request, res: Response) {

        const teamsService = new TeamsService();
        const teams = await teamsService.getTeams();
        return res.json(teams);
    }
}

export { TeamsController }