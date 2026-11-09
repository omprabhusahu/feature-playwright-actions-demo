import { Loginpage } from "../page/loginpage"
import { Productdpage } from "../page/product"
import {url,username,password} from "../utiles/envconfig"
import { test, expect } from "@playwright/test"
import { loginlocator } from "../locators/loginlocator"
import { productlocator } from "../locators/productlocator"
import {producttocart} from "../test_data/productdata"

test.describe("Product page test",()=>
{
    let loginpage: Loginpage;
    let productpage: Productdpage;

    test.beforeEach(async ({page})=>
    {
        loginpage = new Loginpage(page);
        productpage = new Productdpage(page);
        await page.goto(url);
        await loginpage.login(username,password);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        
    })
   
    test("Validate logout function",async({page})=>
    {
        await productpage.logout();
        await expect(page.locator(loginlocator.signinbutton)).toBeVisible();
    })
    test("validate the about function",async({page})=>
    {
        await productpage.about();
        //await expect(page.locator(productpage.request_button)).toBeVisible();
        //await expect(page).toHaveURL("https://saucelabs.com/");
        //await expect(page.locator(productlocator.request_button)).toBeVisible();
    })
    test("validate product details page",async({page})=>
    {
        await productpage.productdetails();
        await productpage.addfirstproducttocart();
        await productpage.allproducttocart();
    })
    test("validate add specific product to cart",async({page})=>
    {

        await productpage.addproductspecificitem(producttocart);

    })
    test("filter product by name A to Z",async({page})=>
    {
        await productpage.filterbynameAtoZ()
        const names=await productpage.getproductname();
        const sorted=[... names].sort();
        expect(names).toEqual(sorted);
    })
    test("filter product by name Z to A",async({page})=>
    {
        await productpage.filterbynameZtoA()
        const names=await productpage.getproductname();
        const sorted=[... names].sort().reverse;
        expect(names).toEqual(sorted);
    })
    test.only("filter product by price low to high",async({page})=>
    {
        await productpage.filterbynameLtoH();
        const price= await productpage.getproductprice();
        const sorted= [... price].sort((a,b)=>a-b);
        expect(price).toEqual(sorted);
    })
    test("filter product by price high to low",async({page})=>
    {
        await productpage.filterbynameHtoL();
    })

}) 
   
