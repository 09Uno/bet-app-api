import puppeteer from "puppeteer";



interface GamesInfoSection {
    games: Games | null | undefined;
    infoSection: InfoSection | null | undefined;
}

type InfoSection = {

    id : string;
    country: string | null | undefined;
    league: string | null | undefined;

}

type Games = {

    id : string;
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
        try {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto("https://www.flashscore.com.br");

            const element = await page.$("#live-table");
            const section = await element?.$$("section > div > div > div");

            const gamesList = [];


            if (section != null && section != null) {



                for (let index = 0; index < section.length; index++) {


                    const element = section[index];
                    


                    const dataCountry = await element?.$(` div > div.icon--flag.event__title > div > span.event__title--type`,);
                    const propsCountry = await dataCountry?.getProperty("textContent");
                    const country = await propsCountry?.jsonValue();


                    const dataLeague = await element?.$(`div > div.icon--flag.event__title > div > span.event__title--name`,);
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




                    const infoSection: InfoSection = {

                        id: index.toString(),
                        country: country || null,
                        league: league || null,
                    }

                    const games: Games = {


                        id: index.toString(),
                        home: home,
                        away: away,
                        homeScore: homeScore,
                        awayScore: awayScore,
                        flagHome: flagHome,
                        flagAway: flagAway,
                        time: time

                    }

                    const gamesInfoSection: GamesInfoSection = {
                        infoSection: infoSection,
                        games: games,
                    }

                    console.log(country);

                    gamesList.push(gamesInfoSection);



                }


            }
            page.close();
            return gamesList;





        } catch (error) {
            console.log(error + "Erro identificado ao tentar acessar os dados da página");
            return error + "Erro identificado ao tentar acessar os dados da página"; 
        }



    }


}

export { NextGamesService };