import puppeteer from "puppeteer";

interface game {


    home: string | null | undefined;
    away: string | null | undefined;
    time: string | null | undefined;
    status: string | null | undefined;

}

class NextGamesService {
    async execute() {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto("https://www.flashscore.com.br");

        const element = await page.$("#live-table > section");

        const section = await element?.$$(".event .soccer .event__match--twoLine");
        const section2 = await element?.$$(".event__header.top");

        const gamesList = [];


        if (section != null && section2 != null) {
            const game: game = {


                home: '',
                away: '',
                time: '',
                status: ''


            };

            for (let index = 0; index < section.length; index++) {
                const element = section[index];


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
                gamesList.push({ home, away, homeScore, awayScore, flagHome, flagAway, time })


            }

        }

        page.close();
        return gamesList;
    }


}

export { NextGamesService };