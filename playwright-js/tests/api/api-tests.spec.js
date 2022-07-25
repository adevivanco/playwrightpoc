
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

    test('login to API and get token', async ({ request }) => {
        const loginResponse = await request.post('/api/user/login', {
            data: {
              email: USER,
              password: PWD,
            }
          });
          await expect(loginResponse.ok()).toBeTruthy();
          var doesResponseBodyContainUser = await loginResponse.body().then(b => b.includes("andresdev@gmail.com"));
          await expect(doesResponseBodyContainUser).toBeTruthy();
          //await expect(data.email).toEqual(USER);
        });
});
