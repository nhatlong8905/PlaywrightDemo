import { test, Page } from "@playwright/test";
import UIActions from "../playwright/actions/UIActions";

export default class FormsPage {
    private ui: UIActions;

    readonly menu = {
        item: (name: string) => `span[class="text"] >> text=${name}`,
      }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    public async gotoMenuItem(item: string) {
        await test.step(`Navigating to ${item}`, async () => {
            await this.ui.element(this.menu.item(item)).click();
        });
    }
}