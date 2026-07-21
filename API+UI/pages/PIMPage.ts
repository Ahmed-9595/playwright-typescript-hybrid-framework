import { Page, Locator } from '@playwright/test';
import Actions from '../utils/Actions';

export default class PIMPage{

    private actions: Actions ;
    private readonly pimBtn: Locator;
    private readonly searchInput: Locator;
    private readonly searchBtn: Locator;
    private readonly editBtn: Locator;
    private employeeId: string;


    constructor(private page: Page,employeeId: string) {
        this.actions = new Actions(page);
        this.pimBtn = page.locator("xpath=//span[text()='PIM']");
        this.searchInput = page.locator("xpath=//label[text()='Employee Id']/../following-sibling::div/input");
        this.searchBtn = page.locator("css=button[type='submit']");
        this.editBtn = page.locator("xpath=(//i[contains(@class,'bi-pencil')])[1]");
        this.employeeId = employeeId;


    }

    async navigateToPIMPage() {
        await this.pimBtn.click();
    }


    async searchEmployee(){
        try{
            await this.actions.clearField(this.searchInput);
            await this.searchInput.fill(this.employeeId);
            await this.searchBtn.click();

        }catch(error){
            throw new Error("Error searching employee: " + error);
        }


    }

    async openEmployeeDetailsPage(){
        try{
            await this.editBtn.click();
        }catch(error){
            throw new Error("Error opening employee details page: " + error);
        }
    }


}