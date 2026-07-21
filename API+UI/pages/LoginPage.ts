import { expect, Locator, Page } from '@playwright/test';
import Actions from '../utils/Actions';
import {AUTH_FILE} from '../constant/constant';
export default class LoginPage {
    private actions: Actions;
    private loginFormLocator: Locator;
    private usernameInputLocator: Locator;
    private passwordInputLocator: Locator;
    private loginButtonLocator: Locator;
    private dashboardLocator: Locator;


    constructor(public page: Page) {
        this.actions = new Actions(page);
        this.loginFormLocator = page.locator('.orangehrm-login-slot');
        this.usernameInputLocator = page.locator('input[name="username"]');
        this.passwordInputLocator = page.locator('input[name="password"]');
        this.loginButtonLocator = page.locator('button[type="submit"]');
        this.dashboardLocator = page.locator('.oxd-topbar-header-breadcrumb');
    }

    async navigateToLoginPage() {

        let retry = 0;
        const maxRetries = 3;
        while (retry < maxRetries) {
            try {
                await this.page.goto('');
                console.log("Navigated to login page");
                if (await this.actions.isItemsDisplayed(this.loginFormLocator)) {
                    return;
                }
                else {
                    throw new Error("Login form not displayed");
                }
            } catch (error) {
                console.error("Error navigating to login page: retry", error);
                await this.page.reload({ waitUntil: 'commit' });
                retry++;
            }
        }


    }

    async login(username: string, password: string) {
        try {
            console.log(`Attempting to login with username: ${username}`);
            await this.actions.clearField(this.usernameInputLocator);
            await this.usernameInputLocator.fill(username);
            console.log(`Username entered: ${username}`);
            console.log(`Attempting to enter password`);
            await this.actions.clearField(this.passwordInputLocator);
            console.log(`Password entered: ${password}`);
            await this.passwordInputLocator.fill(password);

            console.log(`Attempting to click login button`);
            await this.loginButtonLocator.click();
            console.log(`Login button clicked`);
            if (await this.isDashboardDisplayed()) {
                console.log("Login successful");


                await this.page.context().storageState({ path: AUTH_FILE });
            }
            else {
                throw new Error("Login failed");
            }
        }
        catch (error) {
            console.error("Error during login: ", error);
            throw error; // Rethrow the error to fail the test
        }
    }

    async isDashboardDisplayed(): Promise<boolean> {
        return await this.actions.isItemsDisplayed(this.dashboardLocator);

    }

    async getCookies(): Promise<string> {
        const cookies = await this.page.context().cookies();
        const orangehrmValue = cookies.find(cookie => cookie.name === 'orangehrm');

        if (!orangehrmValue) {
            throw new Error("Cookie 'orangehrm' not found");


        }

        return `${orangehrmValue.name}=${orangehrmValue.value}`;

    }


}