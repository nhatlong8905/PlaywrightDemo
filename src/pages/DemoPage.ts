import { test, Page } from "@playwright/test";
import UIActions from "../playwright/actions/UIActions";

export default class DemoPage {
    private ui: UIActions;

    readonly car = {
        tab: (name: string) => `div[class="card-body"] h5 >> text=${name}`,
      }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }
    
    public async gotoCard(carName: string) {
        await test.step(`Navigating to ${carName}`, async () => {
            await this.ui.element(this.car.tab(carName)).click();
        });
    }
}