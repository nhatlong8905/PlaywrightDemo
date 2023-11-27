## Setup

1. To set up this project on your local machine, clone it from the GitHub repository.
2. From the command line in the project's root directory to install all dependencies by run:

   ```bash
   npm install
   ```

3. Next run the following command to download Playwright supported browsers:

   ```bash
   npx playwright install --with-deps
   ```

4. Finnaly run the following command to install cross environment:

   ```bash
   npm install -g cross-env
   ```

## Running Tests

From the command line in the project's root directory:

- Running the tests on PROD environment. By default tests will run without UI (headless mode):

```bash
   npm run test:prod
```

- You can also run the tests on PROD environment with UI (headed mode):

```bash
   npm run test:prod-headed
```

## Tests Output

- After the test finish. An output JSON file named `output.json` will be generated in the root directory. 

## Tests Report

All output file and report is stored in `./testOutput` folder. You can view both Allure and HTML report.

- Generate Allure report:

```bash
    npm run allure
```

![image](https://user-images.githubusercontent.com/49904115/226183572-378e5947-48ae-4a7c-8c0b-1099aa595c9b.png)

![image](https://user-images.githubusercontent.com/49904115/226183625-5d952da2-31b7-4ac8-8fa4-1077bf184a08.png)

- Show HTML test report:

```bash
   npx playwright show-report test-output/html
```

![image](https://user-images.githubusercontent.com/49904115/226183172-4291f595-e606-4983-8599-aa121aa2c774.png)

![image](https://user-images.githubusercontent.com/49904115/226183242-287fd003-5149-41f3-b51f-5ac3463eb75d.png)

## Reference

- To show all Playwrigt option commnad :

```bash
   npx playwright --help
```
