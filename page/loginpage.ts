import {loginlocator}from"../locators/loginlocator";
import { Page } from "@playwright/test";

export class Loginpage
{
    constructor(private Page:Page)
    {

    }
    async login(username:string,password:string,)
    {
        await this.Page.fill(loginlocator.usernameinput,username);
        await this .Page.waitForTimeout(1000);
        await this.Page.fill(loginlocator.passwordinput,password);
        await this .Page.waitForTimeout(2000);
        await this.Page.click(loginlocator.signinbutton);
         await this .Page.waitForTimeout(3000);   
    }
}

