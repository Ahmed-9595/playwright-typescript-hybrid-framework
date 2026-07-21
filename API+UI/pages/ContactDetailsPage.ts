import { Page,Locator, expect } from "@playwright/test";
import Actions from "../utils/Actions";
import {ContactDetails} from "../types/ContactsDetailsData";



export default class ContactDetailsPage{
    private readonly contactTab: Locator;
    private readonly street1: Locator;
    private readonly street2: Locator;
    private readonly city: Locator;
    private readonly state: Locator;
    private readonly zip: Locator;
    private readonly mobile: Locator;
    private readonly email: Locator;
    private readonly saveBtn: Locator;
    private readonly successMsg: Locator;
    private readonly addAttachmentBtn: Locator;
    private readonly fileUpload: Locator;
    private readonly upload_SaveBtn: Locator;
    private readonly attachmentsGrid: Locator;
    private actions: Actions;


    constructor(private page:Page){
        this.contactTab = page.locator("xpath=//a[text()='Contact Details']");
        this.street1 = page.locator("xpath=//label[text()='Street 1']/../following-sibling::div/input");
        this.street2 = page.locator("xpath=//label[text()='Street 2']/../following-sibling::div/input");
        this.city = page.locator("xpath=//label[text()='City']/../following-sibling::div/input");
        this.state = page.locator("xpath=//label[text()='State/Province']/../following-sibling::div/input");
        this.zip = page.locator("xpath=//label[text()='Zip/Postal Code']/../following-sibling::div/input");
        this.mobile = page.locator("xpath=//label[text()='Mobile']/../following-sibling::div/input");
        this.email = page.locator("xpath=//label[text()='Work Email']/../following-sibling::div/input");
        
        this.saveBtn = page.locator("css=button[type='submit']");
        this.successMsg = page.locator("xpath=//div[contains(@class,'oxd-toast-content') and contains(.,'Successfully Updated')]");
        
        this.addAttachmentBtn = page.locator("xpath=//button[text()=' Add ']");
        this.fileUpload = page.locator("xpath=//input[@type='file']");
        this.upload_SaveBtn = page.locator("css=div[class='orangehrm-attachment'] button[type='submit']");
        this.attachmentsGrid = page.locator("xpath=//div[@class='orangehrm-attachment']//div[@class='oxd-table-card']");
        this.actions = new Actions(page);
    }

    async openContactTab() {
        console.log("Opening Contact Tab");
        try{
        await this.contactTab.click();
        await this.page.waitForLoadState('domcontentloaded');
        }catch(error){
            throw new Error("Error opening contact tab: " + error);
        }
    }

    async fillContact(contactDetails:ContactDetails){

        console.log("Filling contact details");

        await this.actions.clearField(this.street1);
        await this.street1.fill(contactDetails.street1);
        await this.actions.clearField(this.street2);
        await this.street2.fill(contactDetails.street2);
        await this.actions.clearField(this.city);
        await this.city.fill(contactDetails.city);
        await this.actions.clearField(this.state);
        await this.state.fill(contactDetails.state);
        await this.actions.clearField(this.zip);
        await this.zip.fill(contactDetails.zip);
        await this.actions.clearField(this.mobile);
        await this.mobile.fill(contactDetails.mobile);
        await this.actions.clearField(this.email);
        await this.email.fill(contactDetails.email);

    }


    async save(){
        console.log("Saving contact details");
        await this.saveBtn.click();
    }

    async verifySuccess() : Promise<boolean> {
        try{
        console.log("Verifying success message");
        let isDisplayed : boolean;
        try{
            expect(this.successMsg).toBeVisible();
            isDisplayed = true;

        }catch(error){
            console.error("Error verifying success message: " + error);
            isDisplayed = false;
            
        }
        const successTextVisible = (await this.successMsg.innerText()).includes("Successfully");
        console.log("Success message visible: ", successTextVisible);
        return isDisplayed && successTextVisible;
        }
        catch(error){
            console.error("Error verifying success message: " + error);
            return false;
        }

    }

    async uploadFile(filePath: string) {

        await this.addAttachmentBtn.click();

        const [upload]= await Promise.all(

            [
                this.page.waitForEvent('filechooser'),
                this.fileUpload.click()
            ]
        ) ;

        await upload.setFiles(filePath);
        await this.upload_SaveBtn.click();

    }

    async fUpload(filePath: string){

        await this.addAttachmentBtn.click();
        await this.fileUpload.setInputFiles(filePath);
        await this.upload_SaveBtn.click();

    }


    async getAttachmentCount() : Promise<number>{
        console.log("Getting attachment count");
        await this.attachmentsGrid.waitFor({state: "visible"});
        return await this.attachmentsGrid.count();

    }



}