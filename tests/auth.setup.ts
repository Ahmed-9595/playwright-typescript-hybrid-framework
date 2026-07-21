import {test as setup} from "@playwright/test";
import * as loginData from "../API+UI/data/UI/loginData.json";
import LoginPage from "../API+UI/pages/LoginPage";

setup("setup", async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(loginData.username, loginData.password);
    
});