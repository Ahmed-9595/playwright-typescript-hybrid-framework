import {test, expect} from "../../API+UI/fixtures/Fixture";


test.describe('Edit Employee API Test', () => {

test('Edit Employee and Verify', async ({personalDetails}) => {

const response = await personalDetails.updatePersonalDetails();
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);
const body = await response.json();

const empNumber = body.data.empNumber;
expect(empNumber).toBe(await personalDetails.getEmpNumber());
});

});