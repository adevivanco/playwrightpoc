
// to use with API tests execute the following command:
//
//    npx playwright tests/api --config=tests/api/api.config.js
//

const config = {
   use: {
    // All requests we send go to this API endpoint.
    baseURL: 'http://localhost:4000',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
 //     'Authorization': `token ${process.env.API_TOKEN}`,
    },
    Authorization: process.env.token,
    reporter: 'html',
    trace: 'on'
  }
};
export default config;