import {test as base, Page} from '@playwright/test'

type myfixture=
{
   myloginpage:Page;
}
export const test2=base.extend<myfixture>({
    
    myloginpage:async({page},use)=>
    {
       await page.goto("https://www.saucedemo.com/");
       await page.locator("#user-name");
       await page.locator("#password");
       await page.locator("#login-button");
       await use(page);
    }
})   
 


