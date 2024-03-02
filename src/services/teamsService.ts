import { Team } from "../types";
import { OrganizeGamesService } from "./organizeDataService";

class TeamsService {
  async getTeams() {
    
        var organizeGamesService = new OrganizeGamesService();
        const data : any = await organizeGamesService.getAllData();
        var teams : Team[] = data.teams;
        return teams;
  }
}

export { TeamsService };