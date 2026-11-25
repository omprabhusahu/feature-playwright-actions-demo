import { checkout } from "../locators/checkoutlocator";
import {Page} from "@playwright/test"

export class chout
{
    constructor (private page :Page)
    {

    }

    async details()
    {
        this.page.locator(checkout.first_name)
    }
    async fillout_details(firstname:string,lastname:string,postalcode:string)
    {
        await this.page.fill(checkout.first_name,firstname);
        await this.page.fill(checkout.last_name,lastname);
        await this.page.fill(checkout.postal_code,postalcode);
    }
    async continuebutton()
    {
        this.page.locator(checkout.continue_button).click;
    }
    async cancelbutton()
    {
        this.page.locator(checkout.cancel_button).click;
        
    }


} 