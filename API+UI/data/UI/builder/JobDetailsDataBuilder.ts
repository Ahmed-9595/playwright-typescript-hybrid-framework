import { faker } from "@faker-js/faker";
import { JobDetails } from "../../../types/JobDetailsData";

export default class JobDetailsDataBuilder {

    private jobDetails: JobDetails = {
        joinedDate: "2015-15-06",
        jobTitle: "Software Engineer",
        employmentStatus: "Part-Time Internship",
        subUnit: "Quality Assurance",
        location: "Canadian Regional HQ"

    }

    setJoinedDate(joinedDate: string): JobDetailsDataBuilder {
        this.jobDetails.joinedDate = joinedDate;
        return this;
    }

    setJobTitle(jobTitle:string): JobDetailsDataBuilder {

        this.jobDetails.jobTitle = jobTitle;
        return this;
    }

    setEmploymentStatus(employmentStatus: string): JobDetailsDataBuilder {
        this.jobDetails.employmentStatus = employmentStatus;
        return this;
    }

    setSubUnit(subUnit: string): JobDetailsDataBuilder {
        this.jobDetails.subUnit = subUnit;
        return this;
    }

    setLocation(location: string): JobDetailsDataBuilder {
        this.jobDetails.location = location;
        return this;
    }

    build(): JobDetails {
        return this.jobDetails;
    }


    


}