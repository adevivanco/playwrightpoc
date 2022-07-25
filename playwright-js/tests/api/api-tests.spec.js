
// to use with API tests execute the following command:
//
//    npx playwright tests/api --config=tests/api/api.config.js
//

const { test, expect, request, process } = require('@playwright/test');
const { use } = require('../../playwright.config');

const USER = 'andresdev@gmail.com';
const PWD = 'Test@1234';
let token = '';

let context = null;
let loginResponse = null;

test.describe('api tests', () =>  {
    
    test.beforeAll(
        async () => {
            // Create a context that will issue http requests.
            context = await request.newContext({
              baseURL: 'http://localhost:4000',
            });
          
            // Create a repository.
            loginResponse = await context.post('/api/user/login', {
                data: {
                    email: USER,
                    password: PWD,
                }
            });

            // get 'token' value from response's body data
            token = await loginResponse.body().then(b => { 
                let data = JSON.parse(b.toString()); 
                return data.token;
            }); 

    });

    test.afterAll(async() => {
        await context.dispose();
    });


    test('validate that login endpoint works correctly', async ({ request }) => {
    
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
    
    test('validate that user is able to get proper logouts', async ({ request}) => {
     
        // make request and get response
        const workoutsResponse = await request.get('/api/workouts', {

            headers: {
                'Accept': 'application/json',
                // Add GitHub personal access token.
                'Authorization': 'Bearer: ' + token,
              },
        });
    
        // assert on response OK (HTTP 200)
        await expect(workoutsResponse.ok()).toBeTruthy();
    
    });
});