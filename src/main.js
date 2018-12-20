console.clear();
import bluebird from "bluebird";
import selenium from "selenium-webdriver";
import WebScraper from "./web-scraper";


var url = "https://www.eventbrite.com/d/ca--san-francisco/business--events--tomorrow"



function colorRed(browser, element) {
    browser.executeScript("arguments[0].setAttribute('style', 'background-color: red')", element)
}

var scraper = new WebScraper();

scraper.setGetDataRoot(async function getDataRoot(browser) {
    var mainSections = await browser.findElements(selenium.By.css("main main main section"));
    //console.log("mainSections", mainSections);
    //console.log("mainSections.length", mainSections.length);
    colorRed(browser, mainSections[0]);
    return mainSections[0];
    
});
scraper.setGetNextPageButton(async function getNextPageButton(browser) {
    console.log("getNextPageButton");
    var paginationControls = await browser.findElements(selenium.By.css("div.paginator"));
    console.log("paginationControls", paginationControls);
    var paginationButtons = await paginationControls[0].findElements(selenium.By.css("a.eds-btn"));
    var nextButton = paginationButtons.slice(-1)[0];
    return nextButton;
});
scraper.open(url);
scraper.start();

bluebird.resolve()
    .delay(5000)
    .then(() => scraper.nextPage())
    .delay(3000)
    .then(() => scraper.scrapeData())
//.then(() => scraper.nextPage())

setInterval(() => {}, 5000);

process.on("exit", function() {
    console.log("on exit");
    scraper.destroy();
})


