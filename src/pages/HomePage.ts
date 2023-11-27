import { test, Page } from "@playwright/test";
import UIActions from "../playwright/actions/UIActions";

export default class HomePage {
    private ui: UIActions;

    readonly header = {
        tab: (name: string) => `ul[class*="navbar__links"] a >> text=${name}`,
      }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    public async launchApplication() {
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(`${process.env.BASE_URL}`);
        });
    }

    public async gotoTab(tabName: string) {
        await test.step(`Navigating to ${tabName}`, async () => {
            await this.ui.element(this.header.tab(tabName)).click();
        });
    }
}