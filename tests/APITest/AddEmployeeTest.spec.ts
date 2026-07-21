import {test, expect} from "../../API+UI/fixtures/Fixture";

test.describe('Add Employee API Test', () => {

test('Add Employee and Verify', async ({addEmployee}) => {

const employeeId = await addEmployee.addEmployeeAndReturnId();
expect(employeeId).toBeDefined();

});

});