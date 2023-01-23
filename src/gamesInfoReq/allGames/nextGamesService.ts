import puppeteer from "puppeteer";

interface game {

    country: string | null | undefined;
    league: string | null | undefined
    home: string | null | undefined;
    away: string | null | undefined;
    time: string | null | undefined;
    status: string | null | undefined;

}

class NextGamesService {
    async execute() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("https://www.flashscore.com.br");

        const element = await page.$("#live-table > section");

        const section = await element?.$$(".event .soccer .event__match--twoLine");
        const section2 = await element?.$$(".event__header.top");

        const gamesList = [];


        if (section != null && section2 != null) {
            const game: game = {

                country: '',
                league: '',
                home: '',
                away: '',
                time: '',
                status: ''

            };

            for (let index = 0; index < section.length; index++) {
                const element = section[index];
                const element2 = section2[index];

                const dataCountry = await element2?.$('div.event__header .event__title--type');
                const propsCountry = await dataCountry?.getProperty("textContent");

                const dataLeague = await element2?.$('div.icon--flag.event__title.fl_3 > div > span.event__title--name');
                const propsLeague = await dataLeague?.getProperty("textContent");

                const dataTime = await element?.$('div.event__time');
                const propsTime = await dataTime?.getProperty("textContent");

                const dataStatus = await element?.$('div.event__stage > div');
                const propStatus = await dataStatus?.getProperty("textContent");


                const dataHome = await element?.$("div.event__participant.event__participant--home");
                const propsHome = await dataHome?.getProperty("textContent");

                const dataAway = await element?.$("div.event__participant.event__participant--away");
                const propsAway = await dataAway?.getProperty("textContent");


                game.country = await propsCountry?.jsonValue();
                game.league = await propsLeague?.jsonValue();

                game.time = await propsTime?.jsonValue();
                game.home = await propsHome?.jsonValue();
                game.away = await propsAway?.jsonValue();
                game.status = await propStatus?.jsonValue();




                // gamesList.push(game.country);

                // gamesList.push(game.league);

                if (game.home) {
                    gamesList.push(game.home);

                }

                if (game.away) {
                    gamesList.push(game.away);

                }
                if (game.time || game.status) {
                    gamesList.push(game.status || game.time);

                }





            }
        }



        console.log(gamesList);
        return gamesList;
    }
}

export { NextGamesService };