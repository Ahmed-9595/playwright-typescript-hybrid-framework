import { test, expect } from "../../API+UI/fixtures/Fixture";
import { ContactDetails } from "../../API+UI/types/ContactsDetailsData";
import ContactDetailsDataBuilder from "../../API+UI/data/UI/builder/ContactDetailsDataBuilder";
import path from "path";
import * as data from "../../API+UI/data/UI/ContactDetails.json";
import JobDetailsDataBuilder from "../../API+UI/data/UI/builder/JobDetailsDataBuilder";
import * as jobDetailsData from "../../API+UI/data/UI/JobDetails.json";
import {JobDetails} from "../../API+UI/types/JobDetailsData";
import JobDetailsPage from "../../API+UI/pages/JobDetailsPage";
test.describe('Full Employee Flow', () => {

    test('Add and Edit Employee and Verify', async ({ page,contactDetailsPage }) => {

        // Fill Contact Details (UI)

        const contactDetailsDataBuilder = new ContactDetailsDataBuilder();

        const contactDetailsData: ContactDetails = contactDetailsDataBuilder
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

        expect(await contactDetailsPage.getAttachmentCount()).toBe(1);

        // -----------------------------
        // Fill Job Details (UI)
        // -----------------------------

        const jobDetailsPage = new JobDetailsPage(page);

        const jobDetailsDataBuilder: JobDetails = new JobDetailsDataBuilder()
        .setJobTitle(jobDetailsData.jobTitle)
        .setJoinedDate(jobDetailsData.joinedDate)
        .setLocation(jobDetailsData.location)
        .setSubUnit(jobDetailsData.subUnit)
        .setEmploymentStatus(jobDetailsData.employmentStatus)
        .build();


        await jobDetailsPage.openJobTab();
        await jobDetailsPage.fillJobDetails(jobDetailsDataBuilder);
        await jobDetailsPage.saveJobDetails();
        expect(await jobDetailsPage.verifySuccess()).toBeTruthy();


    });


});