
// to use with API tests execute the following command:
//
//    npx playwright tests/api --config=tests/api/api.config.js
//

const { test, expect, request } = require('@playwright/test');

const USER = 'andresdev@gmail.com';
const PWD = 'Test@1234';

test.describe('api tests', () =>  {

    let context = null;
    test.beforeEach(async() => {
        context = await request.newContext({
            baseURL: 'http://localhost:4000',
            reporter: 'html',
        });
    })


    test.afterAll(async() => {
        await context.dispose();
    });

    test('validate that login endpoint works correctly', async ({ request }) => {

        // make request and get response
        const loginResponse = await request.post('/api/user/login', {
            data: {
                email: USER,
                password: PWD,
            }
        });
    
        // assert on response OK (HTTP 200)
        await expect(loginResponse.ok()).toBeTruthy();
    
        // get 'email' value from response's body data
        let responseEmail = await loginResponse.body().then(b => { 
            let data = JSON.parse(b.toString()); 
            return data.email;
        });
    
        // assert on email from response equal to email from request
        await expect(responseEmail).toEqual(USER);
    });
    
});
