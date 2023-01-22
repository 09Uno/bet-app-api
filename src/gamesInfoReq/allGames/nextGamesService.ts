import { json } from "express";
import puppeteer from "puppeteer";



class NextGamesService {



    async execute() {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.flashscore.com.br');

        const games = await page.$$('#live-table > section > div > div');

        const game1 = []

        for (const game of games) {


            const time = await page.evaluate((el) => el.querySelector('#g_1_IcYs8jIk > div.event__time')?.textContent, game)

            const home = await page.evaluate((el) => el.querySelector('div.event__participant.event__participant--home')?.textContent, game)

            const away = await page.evaluate((el) => el.querySelector('div.event__participant.event__participant--away')?.textContent, game)

            const league = await page.evaluate((el) => el.querySelector('div.icon--flag.event__title.fl_81 > div > span.event__title--name')?.textContent, game)


            game1.push({ time, home, away, league});

        }
        return ({game1})

    }

}




export { NextGamesService }