import puppeteer from "puppeteer";

export type InfoPageSection = {
    pageUrl: string;
    elementStr: string;
    sectionStr: string;
};

class Page {
    
    private page : any;

    public async loadPage(infoSection: InfoPageSection) {
        try {
            const browser = await puppeteer.launch({ headless: false });
            this.page = await browser.newPage();
            await this.page.goto(infoSection.pageUrl);

            const element = await this.page.$(infoSection.elementStr);
            const section = await element?.$$(infoSection.sectionStr);

            return { section, element };

        } catch (error) {
            throw new Error("Error on load page");
        }
    }

    public async closePage() {
        try {
            if (this.page) {
                await this.page.close();
                await this.page.browser().close();
            }
        } catch (error) {
            throw new Error("Error on close page");
        }
    }
}

export { Page };
