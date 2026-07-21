import {ContactDetails} from "../../../types/ContactsDetailsData";
import {faker} from "@faker-js/faker";


export default class ContactDetailsDataBuilder {

    private contactDetails: ContactDetails = {
        street1: faker.location.streetAddress(),
        street2: faker.location.secondaryAddress(),
        city: "cairo",
        state: "state",
        zip: "12345",
        mobile: "01111111111",
        email: Date.now().toString() + faker.internet.email(),
    };



    setStreet1(street1: string): ContactDetailsDataBuilder {
        this.contactDetails.street1 = street1;
        return this;
    }

    setStreet2(street2: string): ContactDetailsDataBuilder {
        this.contactDetails.street2 = street2;
        return this;
    }

    setCity(city: string): ContactDetailsDataBuilder {
        this.contactDetails.city = city;
        return this;
    }

    setState(state: string): ContactDetailsDataBuilder {
        this.contactDetails.state = state;
        return this;
    }

    setZip(zip: string): ContactDetailsDataBuilder {
        this.contactDetails.zip = zip;
        return this;
    }

    setMobile(mobile: string): ContactDetailsDataBuilder {
        this.contactDetails.mobile = mobile;
        return this;
    }

    setEmail(email: string): ContactDetailsDataBuilder {
        this.contactDetails.email = email;
        return this;
    }

    build(): ContactDetails {
        return this.contactDetails;
    }


    


}