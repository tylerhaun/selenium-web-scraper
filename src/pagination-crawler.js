import bluebird from "bluebird";
import selenium from "selenium-webdriver";
import WebScraperBase from "./web-scraper-base";



async function flattenRecursive(element, ret) {
    //console.log("flattenRecursive()", element, ret);
    ret.push(element);
    var children = await element.findElements(selenium.By.xpath("*"))
    //console.log("children", children);
    return bluebird.all(children.map((child) => flattenRecursive(child, ret)));
}

async function flatten(element) {
    var ret = []
    await flattenRecursive(element, ret)
    return ret;
}


function recursiveTextFinder() {

}


export default class PaginationCrawler extends WebScraperBase {

    constructor() {
        super();
        this._pageNumber = 1;
    }

    setGetNextPageButton(fn) {
        this._getNextPageButton = () => fn(this._browser);
    }

    setGetDataRoot(fn) {
        this._getDataRoot = () => fn(this._browser)
    }

    async nextPage() {
        console.log("nextPage()");
        console.log(this._nextPageButton);
        var nextButton = await this._getNextPageButton();
        nextButton.click();
    }

    async scrapeData() {
        var dataRoot = await this._getDataRoot()
        var dataElementsArray = await dataRoot.findElements(selenium.By.xpath("*"));
        console.log("dataElementsArray", dataElementsArray, dataElementsArray.length);
        var parsed = await bluebird.all(dataElementsArray.map(data => this._parse(data)))

        console.log(parsed);

    }

    async _parse(element) {
        return element.getAttribute("innerHTML");
    }

    //async _parse(element) {

    //    var flat = await flatten(element);
    //    console.log(flat);
    //    var texts = await bluebird.all(flat.map(element => element.getText()));
    //    //    bluebird.all([
    //    //        //element.getTagName(),
    //    //        //element.getAttribute("class"),
    //    //        element.getText()
    //    //    ])
    //    //));
    //    console.log("texts", texts);
    //    console.log("dataElementsArrayInnterHTML", await dataElementsArray[0].getAttribute("innerHTML"));
    //    return texts;
    //
    //}

}
