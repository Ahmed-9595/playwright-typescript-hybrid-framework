import { test as base } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import AddEmployee from "../services/AddEmployee";
import PersonalDetails from "../services/PersonalDetails";
import ContactDetailsPage from "../pages/ContactDetailsPage";
import PIMPage from "../pages/PIMPage";
import JobDetailsPage from "../pages/JobDetailsPage";
type Fixture = {

    loginPage: LoginPage
    addEmployee: AddEmployee
    personalDetails: PersonalDetails
    contactDetailsPage: ContactDetailsPage
    jobDetailsPage: JobDetailsPage
    

}

export const test = base.extend<Fixture>({
    page: async ({ page }, use) => {
        await page.setViewportSize({ width: 2350, height: 1150 });
        await page.goto('', { waitUntil: 'commit' });
        if( page.url().includes("login")) {
            console.log("session expired");
            const loginPage = new LoginPage(page);
            await loginPage.login('Admin', 'admin123');
            if (await loginPage.isDashboardDisplayed()) {
                console.log('Login successful');
            }
            else {
                throw new Error('Login failed');
            }
        }
        else {
            console.log("session not expired");
        }

        await use(page);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    addEmployee: async ({ request , loginPage }, use) => {
        // await loginPage.navigateToLoginPage();
        // await loginPage.login('Admin', 'admin123');
        // if (await loginPage.isDashboardDisplayed()) {
        //     console.log('Login successful');
        // }
        // else {
        //     throw new Error('Login failed');
        // }
        // const token = await loginPage.getCookies();

        const addEmployee = new AddEmployee(request);
        await use(addEmployee);
    },
    personalDetails: async ({request , addEmployee}, use) => {
        const [ employeeNumber, employeeId] = await addEmployee.addEmployeeAndReturnId();
        const personalDetails = new PersonalDetails(request, employeeNumber, employeeId);
        console.log("employeeNumber", employeeNumber);
        console.log("employeeId", employeeId);

        await use(personalDetails);
        
    } ,
    contactDetailsPage: async ({page, addEmployee}, use) => {
        const [, employeeId] = await addEmployee.addEmployeeAndReturnId();
        console.log("employeeId", employeeId);
        const pimPage = new PIMPage(page, employeeId);
        console.log("navigate to PIM page");
        await pimPage.navigateToPIMPage();
        console.log("search employee");
        await pimPage.searchEmployee();
        console.log("open employee details page");
        await pimPage.openEmployeeDetailsPage();
        const contactDetailsPage = new ContactDetailsPage(page);
        await use(contactDetailsPage);
    },
    jobDetailsPage:async({page, addEmployee}, use) => {
        const [, employeeId] = await addEmployee.addEmployeeAndReturnId();
        console.log("employeeId", employeeId);
        const pimPage = new PIMPage(page, employeeId);
        console.log("navigate to PIM page");
        await pimPage.navigateToPIMPage();
        console.log("search employee");
        await pimPage.searchEmployee();
        console.log("open employee details page");
        await pimPage.openEmployeeDetailsPage();
        const jobDetailsPage = new JobDetailsPage(page);
        await use(jobDetailsPage);
    }
});


export { expect } from "@playwright/test";