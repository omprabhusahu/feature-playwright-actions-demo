import { Loginpage } from "../page/loginpage"
import { Productdpage } from "../page/product"
import { url, username, password } from "../utiles/envconfig"
import { test, expect } from "@playwright/test"
import { loginlocator } from "../locators/loginlocator"
import { productlocator } from "../locators/productlocator"
import { producttocart } from "../test_data/productdata"
import { cartpage } from "../page/cart"
import { cartlocator } from "../locators/cartlocator"

test.describe("Productcart page test", () => {
    let loginpage: Loginpage;
    let productpage: Productdpage;
    let cart: cartpage;

    test.beforeEach(async ({ page }) => {
        loginpage = new Loginpage(page);
        productpage = new Productdpage(page);
        cart = new cartpage(page);
        await page.goto(url);
        await loginpage.login(username, password);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    })

    test("validate cart page URL and UI element ", async ({ page }) => {
        
        await productpage.addfirstproducttocart();
        await productpage.clickoncartlink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        const ui = await cart.getcartpageElement();
        await expect((await ui).CartTitle).toBeVisible();
        await expect((await ui).shoppingcart).toBeVisible();
        await expect((await ui).checkout).toBeVisible();
    })

    test("Validate the continue functionality ", async ({ page }) =>
    {

      await productpage.addfirstproducttocart();
      await page.waitForTimeout(3000);
      await productpage.clickoncartlink();
      await page.waitForTimeout(3000);
      await cart.clickon_continue_shopping();
      await page.waitForTimeout(3000);
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            
    })
   
    test.only("Validate the first product  ", async ({ page }) =>
    {

        const firstproductdetails=await productpage.get_first_product_details();
        await page.waitForTimeout(3000);
        await productpage.addfirstproducttocart();
        await page.waitForTimeout(3000);
        await productpage.clickoncartlink();
        await page.waitForTimeout(3000);
        const cartproduct=await cart.getcartproducts();
        await page.waitForTimeout(3000);
        expect(cartproduct[0]).toEqual(firstproductdetails);
           
    })
     test.only("Validate all products to cart ", async ({ page }) =>
    {


            const allprodcutdetails=await productpage.getallproductsdetails();
            await productpage.allproducttocart()
            await productpage.clickoncartlink();
            const cartproduct=await cart.getcartproducts();
            await page.waitForTimeout(3000);
            expect(cartproduct[0]).toEqual(allprodcutdetails);
           
    })
    test.only("Validate specific product to cart ", async ({ page }) =>
    {
       const specificproduct=await productpage.getspecificproductdetails(producttocart);
       productpage.addfirstproducttocart();
       await productpage.clickoncartlink();
       const cartproduct=await cart.getcartproducts();
       await page.waitForTimeout(3000);
       expect(cartproduct).toEqual(specificproduct);
       
           
    })
    test("Validate remove product functionality ", async ({ page }) =>
    {
       await productpage.allproducttocart()
       await productpage.clickoncartlink();
       const initialallproduct = await cart.getcartproducts();
       expect(initialallproduct.length>0);
       await cart.removebutton();
       const updatedcount=await cart.getcartproducts();
       expect(updatedcount.length).toBe(initialallproduct.length-1);
                 
    })
    test("verify the user navigate to chekoutpage", async({page})=>
     {
       cart.checkout();
       await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
     })


 })

