import {test,expect} from "../../API+UI/fixtures/Fixture";
import {ContactDetails} from "../../API+UI/types/ContactsDetailsData";
import ContactDetailsDataBuilder from "../../API+UI/data/UI/builder/ContactDetailsDataBuilder";
import path from "path";
import * as data from "../../API+UI/data/UI/ContactDetails.json";

test.describe('Contact Details API Test', () => {

test('Add Employee and Verify', async ({contactDetailsPage}) => {

const contactDetailsDataBuilder = new ContactDetailsDataBuilder();

const contactDetailsData : ContactDetails = contactDetailsDataBuilder
    .setCity(data.city)
    .setState(data.state)
    .setZip(data.zip)
    .setMobile(data.mobile)
    .build();

await contactDetailsPage.openContactTab();    

await contactDetailsPage.fillContact(contactDetailsData);

await contactDetailsPage.save();

expect(await contactDetailsPage.verifySuccess()).toBeTruthy();

await contactDetailsPage.fUpload(path.resolve("files/sample.jpg"));

expect(await contactDetailsPage.verifySuccess()).toBeTruthy();

expect (await contactDetailsPage.getAttachmentCount()).toBe(1);



});

});