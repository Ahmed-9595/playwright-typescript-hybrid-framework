import {test,expect} from "../../API+UI/fixtures/Fixture";
import JobDetailsDataBuilder from "../../API+UI/data/UI/builder/JobDetailsDataBuilder";
import * as jobDetailsData from "../../API+UI/data/UI/JobDetails.json";
import {JobDetails} from "../../API+UI/types/JobDetailsData";

test.describe('Job Details API Test', () => {
    test('Add Employee and Verify', async ({jobDetailsPage}) => {

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
        
    })



});