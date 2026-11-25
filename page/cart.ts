import {Page} from "playwright/test";
import { cartlocator } from "../locators/cartlocator";

export class cartpage
{
    constructor (private page: Page){}

    async clickon_continue_shopping()
    {
        await  this.page.locator(cartlocator.continuebutton).click();
    }

    async getcartpageElement()
    {
        return {
            CartTitle: this.page.locator(cartlocator.carttitle),
            shoppingcart: this.page.locator(cartlocator.checkoutbutton),
            checkout: this.page.locator(cartlocator.checkoutbutton)
        }
    }

    async getcartproducts()
    {
        const allname =await this.page.locator(cartlocator.prodcut_title).allTextContents();
        const alldescription =await this.page.locator(cartlocator.product_description).allTextContents();
        const allprice =await this.page.locator(cartlocator.product_price).allTextContents();
        
       const allproducts=allname.map((_, i)=>(
        //array of objects [name,description,price]
        { 
              name : allname[i].trim(),
              description : alldescription[i].trim(),
              price : allprice[i].trim()
            
           
        }))
        return allproducts;
    
    }

    async removebutton()
    {
       await this.page.locator(cartlocator.removebutton).click();
    }
    async checkout()
    {
        await this.page.locator(cartlocator.checkoutbutton).click();
    }
    

} 

