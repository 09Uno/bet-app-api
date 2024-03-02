import { Team, League, Country, Game } from '../types';
import { Page, InfoPageSection } from './page';


class OrganizeGamesService {

    private teams: Team[] = [];
    private leagues : League[] = [];
    private countrys : Country[] = [];
    private games: any[] = [];

    
    async getAllData() {
        try {
            
            var InfoPageSection: InfoPageSection = {
                pageUrl: "https://www.flashscore.com.br",
                elementStr: "#live-table",
                sectionStr: "section > div > div > div"
            };
            
            const page = new Page();
            const InfoPageResult = await page.loadPage(InfoPageSection);    


            if (InfoPageResult?.element != null && InfoPageResult.section != undefined) {

                for (let index = 0; index < InfoPageResult.section.length; index++) {


                    const element = InfoPageResult.section[index];
           
                    const dataCountry = await element?.$(` #live-table > section > div > div > div > div > div > div > span`,);
                    const propsCountry = await dataCountry?.getProperty("textContent");
                    var country = await propsCountry?.jsonValue();


                    const dataLeague = await element?.$(`#live-table > section > div > div > div > div > div > div > a`,);
                    const propsLeague = await dataLeague?.getProperty("textContent");
                    const league = await propsLeague?.jsonValue();

                    const dataHome = await element?.$("div.event__participant.event__participant--home");
                    const propsHome = await dataHome?.getProperty("textContent");

                    const dataAway = await element?.$("div.event__participant.event__participant--away");
                    const propsAway = await dataAway?.getProperty("textContent");

                    const dataHomeScore = await element?.$('div.event__score.event__score--home');
                    const propsHomeScore = await dataHomeScore?.getProperty("textContent");

                    const dataAwayScore = await element?.$('div.event__score.event__score--away');
                    const propsAwayScore = await dataAwayScore?.getProperty("textContent");

                    const dataFlagHome = await element?.$('.event__match--twoLine .event__logo--home')
                    const propsFlagHome = await dataFlagHome?.getProperty("src");

                    const dataFlagAway = await element?.$('.event__match--twoLine .event__logo--away')
                    const propsFlagAway = await dataFlagAway?.getProperty("src");

                    const dataTime = await element?.$('div.event__time');
                    const propsTime = await dataTime?.getProperty("textContent");

                    const dataStatus = await element?.$('div.event__stage > div');
                    const propStatus = await dataStatus?.getProperty("textContent");

                    const home = await propsHome?.jsonValue();
                    const away = await propsAway?.jsonValue();
                    const homeScore = await propsHomeScore?.jsonValue();
                    const awayScore = await propsAwayScore?.jsonValue();
                    const flagHome = await propsFlagHome?.jsonValue();
                    const flagAway = await propsFlagAway?.jsonValue();

                    const period = await propsTime?.jsonValue();
                    const status = await propStatus?.jsonValue();

                    const time = period || status;
                    
                    //pegar dados do pais
                    var countryObj : Country = {
                        id: index.toString(),
                        name: country,
                        flag: null
                    }
                   
                    //pegar dados do campeonato
                    var leagueObj : League = {
                        id: index.toString(),
                        name: league,
                        flag: null,
                        country: null
                    }                

                    //pegar dados dos times da casa
                    var homeTeamObj : Team = {
                        id: index.toString(),
                        name: home,
                        flag: flagHome,
                        country: countryObj,
                        league: leagueObj
                    }

                    //pegar dados dos times visitantes
                    var awayTeamObj : Team =  {
                        id: index.toString(),
                        name: away,
                        flag: flagAway,
                        country: countryObj,
                        league: leagueObj
                    }

                    //juntar tudo em um objeto games
                    var gameObj : Game = {
                        id: index.toString(),
                        home: homeTeamObj,
                        away: awayTeamObj,
                        homeScore: homeScore,
                        awayScore: awayScore,
                        time: time,
                        league: leagueObj,
                        country: countryObj
                    }


                    //  desenvolver lógica para pegar os dados certos para cada jogo
                     if(country !== undefined ) {
                        countryObj.id = this.countrys.length.toString();
                        countryObj.name = country;

                        leagueObj.id = this.leagues.length.toString();
                        leagueObj.name = league;
                        leagueObj.country = countryObj;

                        this.countrys.push(countryObj);
                        this.leagues.push(leagueObj);   
                    }
                    else{

                        homeTeamObj.id = this.teams.length.toString();
                        homeTeamObj.country = this.countrys[this.countrys.length - 1];
                        homeTeamObj.league = this.leagues[this.leagues.length - 1];
                        homeTeamObj.name = home;
                        homeTeamObj.flag = flagHome;
                        this.teams.push(homeTeamObj);
                        
                        awayTeamObj.id = this.teams.length.toString();
                        awayTeamObj.country = this.countrys[this.countrys.length - 1];
                        awayTeamObj.league = this.leagues[this.leagues.length - 1];
                        awayTeamObj.name = away;
                        awayTeamObj.flag = flagAway;
                        this.teams.push(awayTeamObj);


                        gameObj.id = this.games.length.toString();
                        gameObj.home = homeTeamObj;
                        gameObj.away = awayTeamObj;
                        gameObj.homeScore = homeScore;
                        gameObj.awayScore = awayScore;
                        gameObj.time = time;
                        gameObj.league = this.leagues[this.leagues.length - 1];
                        gameObj.country = this.countrys[this.countrys.length - 1];
                        this.games.push(gameObj);

                    }

                }
            }
            await page.closePage();
            return { teams: this.teams, leagues: this.leagues, coutrys: this.countrys, games: this.games };

        } catch (error) {
            throw new Error("Error on organize data");
        } 

    }

}

export { OrganizeGamesService }