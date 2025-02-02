import { Builder, Browser, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

describe("SauceDemo Login Test", function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("https://www.saucedemo.com");
        await driver.manage().window().maximize();
    });

    it("should display 'X' icons and error message when logging in with incorrect credentials", async function () {
        // Act: Enter username and password (incorrect password)
        let usernameField = await driver.findElement(By.id("user-name"));
        let passwordField = await driver.findElement(By.id("password"));

        // Enter the username and incorrect password
        await usernameField.sendKeys("standard_user");
        await passwordField.sendKeys("pogresnaSifra");

        // Click the Login button
        let loginButton = await driver.findElement(By.id("login-button"));
        await loginButton.click();

        // Wait for the error message and "X" icons to appear
        let usernameErrorIcon = await driver.wait(until.elementLocated(By.css('.input_error .icon-error')), 30000); // For the username field
        let passwordErrorIcon = await driver.wait(until.elementLocated(By.css('.input_error .icon-error')), 20000); // For the password field

        // Assert: Verify that the "X" icon appears next to the Username and Password fields
        expect(await usernameErrorIcon.isDisplayed()).to.be.true;
        expect(await passwordErrorIcon.isDisplayed()).to.be.true;

        
        let errorMessage = await driver.wait(until.elementLocated(By.css('h3[data-test="error"]')), 20000);

        // Assert: Verify the error message
        let actualErrorMessage = await errorMessage.getText();
        let expectedErrorMessage = "Epic sadface: Username and password do not match any user in this service";
        expect(actualErrorMessage).to.equal(expectedErrorMessage);

        // Click the "X" icon to close the error message 
        await usernameErrorIcon.click();

        // Assert
        await driver.wait(until.elementIsNotVisible(errorMessage), 30000);
        expect(await errorMessage.isDisplayed()).to.be.false;
    });

    after(async function () {
        await driver.quit(); 
    });
});