import selenium from "selenium-webdriver";


export default class WebScraperBase {

    constructor() {

        const browser = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .build();
        browser.getWindowHandle();
        browser.manage().window().setRect({width: 1024, height: 768});
        this._browser = browser;
    
    }

    open(url) {
        return this._browser.get(url)
    }

    destroy() {
        console.log("destroy()");
        this._browser.quit();
    }
}
