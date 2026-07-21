import { Page, Locator, expect } from "@playwright/test";
import Actions from "../utils/Actions";
import { JobDetails } from "../types/JobDetailsData";
import dayjs from 'dayjs';
export default class JobDetailsPage {

    private actions: Actions;

    private readonly jobTab: Locator;
    private readonly jobTitleDropdown: Locator;
    private readonly subUnitDropdown: Locator;
    private readonly locationDropdown: Locator;
    private readonly includeContractCheckbox: Locator;
    private readonly joinedDateInput: Locator;
    private readonly contractStartDateInput: Locator;
    private readonly contractEndDateInput: Locator;
    private readonly saveButton: Locator;
    private readonly successMessage: Locator;

    constructor(private page: Page) {
        this.actions = new Actions(page);

        this.jobTab = page.getByRole('link', { name: 'Job' });
        this.jobTitleDropdown = page.locator("//label[text()='Job Title']/following::div[contains(@class,'oxd-select-text-input')]");
        this.subUnitDropdown = page.locator("//label[text()='Sub Unit']/following::div[contains(@class,'oxd-select-text-input')]");
        this.locationDropdown = page.locator("//label[text()='Location']/following::div[contains(@class,'oxd-select-text-input')]");
        this.includeContractCheckbox = page.locator('.oxd-switch-wrapper > label');
        this.joinedDateInput = page.locator("//label[text()='Joined Date']/following::input[@placeholder='yyyy-dd-mm']");
        this.contractStartDateInput = page.locator("//label[text()='Contract Start Date']/following::input[@placeholder='yyyy-dd-mm']");
        this.contractEndDateInput = page.locator("//label[text()='Contract End Date']/following::input[@placeholder='yyyy-dd-mm']");
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.successMessage = page.locator("//div[contains(@class,'oxd-toast-content') and contains(.,'Successfully Updated')]");
    }

    async openJobTab() {
        try {
            console.log("opening job tab");
            await this.jobTab.click();
        } catch (e) {
            throw new Error("error opening job tab: " + e);
        }
    }

    async fillJobDetails(jobDetails: JobDetails) {
        try {
            console.log("filling job details");
            await this.actions.clearField(this.joinedDateInput);
            await this.joinedDateInput.fill(jobDetails.joinedDate);
            await this.actions.selectOption(this.jobTitleDropdown, jobDetails.jobTitle);
            await this.actions.selectOption(this.subUnitDropdown, jobDetails.subUnit);
            await this.actions.selectOption(this.locationDropdown, jobDetails.location);

            await this.includeContractCheckbox.click();
            await this.actions.isItemsDisplayed(this.contractStartDateInput);
            const today = dayjs();
            const oneYearFromToday = today.add(1, 'year');

            // اضبط الـ Format حسب ما الأبلكيشن بتاعك متوقع (مثلاً YYYY-MM-DD)
            const formattedToday = today.format('YYYY-MM-DD');
            const formattedOneYearFromToday = oneYearFromToday.format('YYYY-MM-DD');

            // fill بتعمل clear وتكتب مباشرة
            await this.contractStartDateInput.first().fill(formattedToday);
            await this.contractEndDateInput.first().fill(formattedOneYearFromToday);

            console.log("job details filled successfully");

        } catch (e) {
            throw new Error("error filling job details: " + e);
        }
    }

    async saveJobDetails() {
        try {
            console.log("saving job details");
            await this.saveButton.click();
        } catch (e) {
            throw new Error("error saving job details: " + e);
        }
    }

     async verifySuccess() : Promise<boolean> {
        try{
        console.log("Verifying success message");
        let isDisplayed : boolean;
        try{
            expect(this.successMessage).toBeVisible();
            isDisplayed = true;

        }catch(error){
            console.error("Error verifying success message: " + error);
            isDisplayed = false;
            
        }
        const successTextVisible = (await this.successMessage.innerText()).includes("Successfully");
        console.log("Success message visible: ", successTextVisible);
        return isDisplayed && successTextVisible;
        }
        catch(error){
            console.error("Error verifying success message: " + error);
            return false;
        }

    }









}