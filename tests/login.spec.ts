import { Loginpage } from "../page/loginpage";  
import {url,username,password,} from "../utiles/envconfig";
import { test,expect } from "@playwright/test";

test("Login test",async({page})=>
{
    const loginpage = new Loginpage(page);
    await page.goto(url);
    await loginpage.login(username,password);
    await expect(page).toHaveURL("https://gymvanta.in/login");
})    