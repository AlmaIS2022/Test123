import { Builder, Browser, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

describe("SauceDemo Login and Add Products to Cart Test", function () {
    let driver;

  
    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get("https://www.saucedemo.com");
        await driver.manage().window().maximize();
    });

    it("should log in and add products to the cart", async function () {
        // Login 
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.id("password")).sendKeys("secret_sauce");
        await driver.findElement(By.id("login-button")).click();

        // Product page
        let productsPageTitle = await driver.wait(until.elementLocated(By.css(".title")), 15000);  
        expect(await productsPageTitle.isDisplayed()).to.be.true;

        //Add to Cart
        let firstAddToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-bike-light")); 
        let secondAddToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")); 
        
        await firstAddToCartButton.click();
        await secondAddToCartButton.click();

        
        let cartBadge = await driver.wait(until.elementLocated(By.css(".shopping_cart_badge")), 5000);  
        expect(await cartBadge.isDisplayed()).to.be.true;

        let cartCount = await cartBadge.getText();
        expect(cartCount).to.equal("2");  

    });

    

    after(async function () {
        await driver.quit();
    });
});


