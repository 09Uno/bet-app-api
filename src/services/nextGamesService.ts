import { Team, Game } from './../types/index.d';
import { OrganizeGamesService } from './organizeDataService';


class NextGamesService {
    async  execute() {
     
        var  organizeGamesService = new OrganizeGamesService();
        const data : any = await organizeGamesService.getAllData();
        var games : Game[] = data.games;

        return games;
    }
}

export { NextGamesService };