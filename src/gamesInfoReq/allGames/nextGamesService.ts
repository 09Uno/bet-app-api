

import puppeteer, { executablePath } from "puppeteer";
import { v4 as uuidv4 } from 'uuid';




interface GamesInfoSection {
    idMain: string;
    games: Games | null | undefined;
    infoSection: InfoSection | null | undefined;
}

type InfoSection = {

    idInfo: string;
    idSection: string;
    country: string | null | undefined;
    league: string | null | undefined;

}

type Games = {

    idGame: string;
    idSection: string;
    home: string | null | undefined;
    away: string | null | undefined;
    homeScore: string | null | undefined;
    awayScore: string | null | undefined;
    flagHome: string | null | undefined | unknown;
    flagAway: string | null | undefined | unknown;
    time: string | null | undefined;

}

class NextGamesService {
    async execute() {

        //counts to create id's to section and games
        var count2 = -1;
        var count = -1;

        try {
            //using library puppeteer to get data from livescore.com.br or the site you want

            //you need to put the headless option as false to see the browser opening
            const browser = await puppeteer.launch({ headless: false , 
                executablePath : 'C:/Program Files/Google/Chrome/Application/chrome.exe'
            });
            const page = await browser.newPage();
            await page.goto("https://www.livescore.in/br/");

            //getting the element that contains the games
            const element = await page.$("#live-table");
            const section = await element?.$$("section > div > div > div");

            const gamesList = [];

            //checking if the element exists
            if (section != null && section != null) {



                //looping through the games
                for (let index = 0; index < section.length; index++) {


                    const element = section[index];

                    //getting the data from the games info section

                    //getting the data from the section containing the country and league

                    const dataCountry = await element?.$(` div > div.icon--flag.event__title > div > span.event__title--type`,);
                    const propsCountry = await dataCountry?.getProperty("textContent");
                    const dataLeague = await element?.$(`div > div.icon--flag.event__title > div > span.event__title--name`,);
                    const propsLeague = await dataLeague?.getProperty("textContent");


                    //getting the data from the games section

                    //getting the data from the section containing the home and away teams        
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


                    //getting the data from the section containing the time and status of the game
                    const dataTime = await element?.$('div.event__time');
                    const propsTime = await dataTime?.getProperty("textContent");

                    const dataStatus = await element?.$('div.event__stage > div');
                    const propStatus = await dataStatus?.getProperty("textContent");




                    //getting the values from the data

                    const country = await propsCountry?.jsonValue();
                    const league = await propsLeague?.jsonValue();
                    const home = await propsHome?.jsonValue();
                    const away = await propsAway?.jsonValue();
                    const homeScore = await propsHomeScore?.jsonValue();
                    const awayScore = await propsAwayScore?.jsonValue();
                    const flagHome = await propsFlagHome?.jsonValue();
                    const flagAway = await propsFlagAway?.jsonValue();
                    const period = await propsTime?.jsonValue();
                    var status = await propStatus?.jsonValue();


                    if(status != "Encerrado"){
                        status = status + "'"
                    }

                    //checking if the due values are null or undefined, to replace them with a default value
                    const time = period || status
                    const homeScoreNumber = homeScore || "-"
                    const awayScoreNumber = awayScore || "-"

                    //creating id's to section and games

                    var infoId: string = ""
                    var gameId: string = ""
                    //checking if the values are null or undefined, to create the id's counting the number of games and sections
                    if (country && league != null || country && league != undefined) {
                        // count++;
                        infoId = uuidv4().toString()
                    }
                    else if (home && away != null || home && away != undefined) {
                        // count2++;
                        gameId = uuidv4().toString()
                    }



                    //checking if the values are null or undefined, to create the objects

                    //creating the objects
                    const infoSection: InfoSection = {

                        idInfo: infoId,
                        idSection: infoId,
                        country: country,
                        league: league,
                    }

                    const games: Games = {

                        idGame: gameId,
                        idSection: infoId,
                        home: home,
                        away: away,
                        homeScore: homeScoreNumber,
                        awayScore: awayScoreNumber,
                        flagHome: flagHome,
                        flagAway: flagAway,
                        time: time

                    }

                    const gamesInfoSection: GamesInfoSection = {

                        idMain: uuidv4().toString(),
                        infoSection: infoSection,
                        games: games,
                    }



                    //pushing the objects to the array
                    gamesList.push(gamesInfoSection);

                    //just to check if the objects are being created

                }




            }

            //closing the browser
            page.close();
            return gamesList;


        } catch (error) {
            console.log(error + "Erro identificado ao tentar acessar os dados da página");
            return error + "Erro identificado ao tentar acessar os dados da página";
        }

    }

}

export { NextGamesService };
