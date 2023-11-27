import { Page } from "@playwright/test";
import CommonConstants from "../../constants/CommonConstants";
import EditBoxActions from "./EditBoxActions";
import UIElementActions from "./UIElementActions";

export default class UIActions {
  private elementAction: UIElementActions;
  private editBoxAction: EditBoxActions;

  constructor(private page: Page) {
    this.elementAction = new UIElementActions(page);
    this.editBoxAction = new EditBoxActions(page);
  }

  /**
   * Returns page object
   * @returns
   */
  public getPage(): Page {
    return this.page;
  }

  /**
   * Sets the page
   * @param page
   */
  public setPage(page: Page) {
    this.page = page;
    this.elementAction = new UIElementActions(page);
    this.editBoxAction = new EditBoxActions(page);
  }

  /**
   * Close page 
   * @returns 
   */
  public closePage() {
    this.page.close();
  }


  /**
   * Returns the instance of editbox actions
   * @param selector
   * @returns
   */
  public editBox(selector: string) {
    return this.editBoxAction.setEditBox(selector);
  }

  /**
   * Returns the instance of UIElements actions
   * @param selector
   * @returns
   */
  public element(selector: string) {
    return this.elementAction.setElement(selector);
  }

  /**
   * Returns the instance of UIElements actions
   * @param text
   * @returns
   */
  public elementbytext(text: string) {
    return this.elementAction.setElement(`text='${text}'`);
  }


  /**
   * Navigate to specified URL
   * @param URL
   */
  public async goto(URL: string) {
    await this.page.goto(URL);
  }

  /**
   * Navigate to previous URL
   */
  public async goBack() {
    await this.page.goBack();
  }

  /**
   * Navigate to next URL
   */
  public async goForward() {
    await this.page.goForward();
  }

  /**
   * Page Refresh
   */
  public async pageRefresh() {
    await this.page.reload();
  }

  /**
   * Press a key on web page
   * @param key
   * @param description
   */
  public async keyPress(key: string) {
    await this.page.keyboard.press(key);
  }

  /**
   * Waits for the main frame navigation and returns the main resource response.
   */
  public async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  /**
   * Returns when the required load state has been reached.
   */
  public async waitForLoadState() {
    await this.page.waitForLoadState();
  }

  /**
   * Returns when the required dom content is in loaded state.
   */
  public async waitForDomContentLoaded() {
    await this.page.waitForLoadState("domcontentloaded", { timeout: 5000 });

  }
  

  /**
   * Gets the handle of the new window
   * @param selector
   */
  public async switchToNewWindow(
    selector: string,
  ): Promise<Page> {
    let [newPage] = [this.page];
    [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      await this.elementAction.setElement(selector).click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }

  private async handleAlert(
    selector: string,
    message: Promise<string>,
  ) {
    await this.elementAction.setElement(selector).click();
    return message;
  }

  /**
   * Gets the page Title
   * @returns
   */
  public async getPageTitle(): Promise<string> {
    let title: string;
    title = await this.page.title();
    return title;
  }

  /**
   * Downloads the file and returns the downloaded file name
   * @param selector element that results in file download
   * @returns downloaded file name
   */
  public async downloadFile(selector: string, description: string): Promise<string> {
    let fileName: string;
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      await this.page.locator(selector).click({ modifiers: ["Alt"] }),
    ]);
    fileName = download.suggestedFilename();
    const filePath = `${CommonConstants.DOWNLOAD_PATH}${fileName}`;
    await download.saveAs(filePath);
    await download.delete();
    return fileName;
  }
  /**
   * Pause the execution in seconds
   * @param sec
   */
  public async pauseInSecs(sec: number) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, sec * CommonConstants.ONE_THOUSAND));
  }

  /**
   * Wait For response success
   * @param url
   */
  public async waitForResponseSuccess(url: string) {
    await this.page.waitForResponse(
      (response) => response.url().includes(url) && response.status() === 200
    );
  }

    /**
   * Wait For response success
   * @param url
   * @param method
   */
    public async waitForRequest(url: string, method: string) {
      await this.page.waitForRequest(
        (request) => request.url().includes(url) && request.method() === method
      );
    }
}
