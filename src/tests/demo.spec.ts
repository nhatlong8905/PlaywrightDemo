import { test } from '@playwright/test';
import ExcelUtil from "../utils/ExcelUtil"
import HomePage from 'pages/HomePage';
import DemoPage from 'pages/DemoPage';
import FormsPage from 'pages/FormsPage';
import PracticePage from 'pages/PracticePage';

const SHEET1 = "Demo";
const data = ExcelUtil.getTestDataArray(SHEET1);
test(`Test QA tool`, async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const home = new HomePage(page);
    await home.launchApplication();
    await home.gotoTab("DEMO SITE")

    const pagePromise = context.waitForEvent('page');
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    const demo = new DemoPage(newPage);
    await demo.gotoCard("Forms");

    const forms = new FormsPage(newPage);
    await forms.gotoMenuItem("Practice Form")

    const practice = new PracticePage(page);

    data.forEach(item =>{
        test.step(`${item.Description}`, async () => {
            await practice.fillNameAndEmail(item.FirstName, item.LastName, item.Email);
            await practice.fillGenderdNumberBirthAndSubjects(item.Gender, item.Mobile, item.Subject, item.Birth);
            await practice.fillHobiesPictureAndCurrentAddress(item.Hobies, item.FileName, item.Address);
            await practice.selectField("Select State", item.State);
            await practice.selectField("Select City", item.City);
            await practice.submitForm();
            await practice.validationSubmitSuccess();
        });
    })
});