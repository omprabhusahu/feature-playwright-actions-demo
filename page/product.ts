import { productlocator } from "../locators/productlocator";
import { Page } from "@playwright/test";

export class Productdpage
{
    constructor(private page:Page)
    {

    }

    async logout()
    {
        
        await this.page.click(productlocator.menubutton);
        await this.page.click(productlocator.logout_button);

    }
    async about()
    {
        await this.page.click(productlocator.menubutton);
        await this.page.click(productlocator.about_button);
        //await this.page.waitForTimeout(2000);
        //await this.page.click(productlocator.request_button);
    }
    async productdetails()
    {
        const productName = await this.page.locator(productlocator.product_name).allTextContents();
        const productDescription = await this.page.locator(productlocator.product_description).allTextContents();
        const productPrice = await this.page.locator(productlocator.product_price).allTextContents();
        const productButton_count = await this.page.locator(productlocator.product_button).count();

        if(productName.length==0)
        {
            throw new Error("no product found");
        }
        if(productName.length!==productDescription.length||productName.length!==productPrice.length||productName.length!==productButton_count)
        {
            throw new Error("inconsistent product details");
        }
    }
    async addfirstproducttocart()
    {
        await this.page.locator(productlocator.product_button).first().click();
    }

    async allproducttocart()
    {
        const button=await this.page.locator(productlocator.product_button);
        const count=await button.count();

        for(let i=0;i<count;i++)
        { 
            await button.nth(i).click();
            await this.page.waitForTimeout(1000);

        }

    }
    async addproductspecificitem(productName:string[])
    {
       const addproducts = await this.page.locator(productlocator.product_name);
       const  count1=await addproducts.count();
       for(let i=0;i<count1;i++)
       {
        const name=await addproducts.nth(i).textContent()
        if(name && productName)
        {
            await this.page.locator(productlocator.product_button).nth(i).click();
            await this.page.waitForTimeout(3000);
        }

       }
    
    }
    async filterbynameAtoZ()
    {
        await this.page.selectOption(productlocator.product_filter_option,"az");
    }
    async filterbynameZtoA()
    {
        this.page.waitForTimeout(4000);
        await this.page.selectOption(productlocator.product_filter_option,"za");
    }
    async filterbynameLtoH()
    {
        await this.page.selectOption(productlocator.product_filter_option,"lohi");
    }
    async filterbynameHtoL()
    {
        await this.page.selectOption(productlocator.product_filter_option,"hilo");
    }

    async getproductname()
    {
        return await this.page.locator(productlocator.product_name).allTextContents();
    }
    async getproductprice()
    {
        const prices=await this.page.locator(productlocator.product_price).allTextContents();
        return prices.map(price=>parseFloat(price.replace("$","")));
    }
    

}