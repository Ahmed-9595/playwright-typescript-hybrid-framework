import { APIRequestContext } from '@playwright/test';
import { APIResponse } from '@playwright/test';
import { editPersonalDetails } from '../data/API/EditPersonalDetails';

export default class PersonalDetails{
    private BASE_URL: string = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/";
    private ENDPOINT: string = "" ;
    private employeeNumber: string = "";
    private employeeId: string = "";


    constructor(public request: APIRequestContext ,employeeNumber: string , employeeId: string){
        this.employeeNumber = employeeNumber;
        this.employeeId = employeeId;
        this.ENDPOINT = `pim/employees/${employeeNumber}/personal-details`;

    }


    async updatePersonalDetails() : Promise<APIResponse> {
        const newData = editPersonalDetails;
        newData.employeeId = newData.employeeId.replace('{employeeId}', this.employeeId);
        const response :APIResponse = await this.request.put(`${this.BASE_URL}${this.ENDPOINT}`, {
            data: newData,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok()) {
            console.log('Personal details updated successfully');
        } else {
           
            const body = await response.json();
            console.log(`Failed to update personal details. Status: ${response.status()}, Message: ${body.message}`);
            throw new Error(`Failed to update personal details. Status: ${response.status()}, Message: ${await response.text()}`);
        }

        return response;
    }

    async getEmpNumber(){
        return this.employeeNumber;
    }


}