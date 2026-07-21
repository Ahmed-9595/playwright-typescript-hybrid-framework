import { APIRequestContext } from '@playwright/test';
import { employeeData } from '../data/API/AddEmployee';

export default class AddEmployee {

    private BASE_URL: string = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/";
    private ENDPOINT: string = 'pim/employees';
    private token: string = '';

    constructor(private request: APIRequestContext ) {
    }


    async addEmployeeAndReturnId() : Promise<string[]> {
        const newData = employeeData;
        newData.employeeId = newData.employeeId.replace('{employeeId}', Math.floor(Math.random() * 1000000).toString());
        const response = await this.request.post(`${this.BASE_URL}${this.ENDPOINT}`, {
            data: newData,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok()) {
            console.log(`Employee added successfully with ID: ${newData.employeeId}`);
        } else {
            throw new Error(`Failed to add employee. Status: ${response.status()}, Message: ${await response.text()}`);
        }
        const body = await response.json();
        const employeeNumber = body.data.empNumber;
        const employeeId = body.data.employeeId;
        return [employeeNumber, employeeId];
}

async getTokenHeader() : Promise<string> {
    return this.token;
}


}