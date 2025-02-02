import { Builder, Browser, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("SauceDemo Login Test", function () {
    let driver;

    // WebDriver
    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("https://www.saucedemo.com");
        await driver.manage().window().maximize();
    });

    it("should display 'X' icons and error message when logging in with empty fields", async function () {
        let loginButton = await driver.findElement(By.id("login-button"));
        await loginButton.click();

        try {
    
            let usernameErrorIcon = await driver.wait(until.elementLocated(By.css(".svg-inline--fa fa-times-circle fa-w-16 error_icon"), 5000));  // Example error selector
            let passwordErrorIcon = await driver.wait(until.elementLocated(By.id(".svg-inline--fa fa-times-circle fa-w-16 error_icon"), 5000));  // Example error selector

            
            expect(await usernameErrorIcon.isDisplayed()).to.be.true;
            expect(await passwordErrorIcon.isDisplayed()).to.be.true;

        
            let closeButton = await driver.wait(until.elementLocated(By.css("button.error-button")), 10000); // Ensure this is the correct button
            await closeButton.click();

            let errorMessage = await driver.findElement(By.css('.error-message-container'));
            await driver.wait(until.elementIsNotVisible(errorMessage), 10000);
            expect(await errorMessage.isDisplayed()).to.be.false;

        } catch (error) {
            console.error("Error during waiting for elements: ", error);
            throw error; 
        }
    });

    after(async function () {
        await driver.quit();
    });
});