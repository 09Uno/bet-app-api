import puppeteer from "puppeteer";



interface GamesInfoSection {

    infoSection: InfoSection;
    games: Games;

}

type InfoSection = {

    country: string | undefined;
    league: string | undefined;

}

type Games = {

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
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto("https://www.flashscore.com.br");

        const element = await page.$("#live-table > section");
        const element2 = await page.$("#live-table > section");


        const section = await element?.$$(".event .soccer .event__match--twoLine");
        const section2 = await element2?.$$(" .event__header");

        const gamesList = [];


        if (section != null && section2 != null) {







            for (let index = 0; index < section.length; index++) {
                
                

                const element = section[index];
                const element2 = section2[index];

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


                const dataCountry = await element2?.$('.event__header .event__title--type',);
                const propsCountry = await dataCountry?.getProperty("textContent");
                const country = await propsCountry?.jsonValue();


                const dataLeague = await element2?.$('.event__header .event__title--name',);
                const propsLeague = await dataLeague?.getProperty("textContent");
                const league = await propsLeague?.jsonValue();



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

                    country: country || undefined,
                    league: league || undefined
                }

                const games: Games = {

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


                gamesList.push(gamesInfoSection);

                

            }


        }
        page.close();
        return gamesList;
    }


}

export { NextGamesService };