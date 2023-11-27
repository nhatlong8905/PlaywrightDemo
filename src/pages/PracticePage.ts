import { test,Page } from "@playwright/test";
import UIActions from "../playwright/actions/UIActions";
import CommonConstants from "../constants/CommonConstants";
import Assert from "@asserts/Assert";

export default class PracticePage {
    private ui: UIActions;

    readonly menu = {
        item: (name: string) => `span[class="text"] >> text=${name}`,
      }
    readonly firstName = '#userForm #firstName';
    readonly lastName = '#lastName';
    readonly userEmail = '#userEmail';
    readonly radio_checkbox = {
        item: (name: string) => `label[class="custom-control-label"] >> value=${name}`,
    };
    readonly userNumber = '#userNumber';
    readonly dateOfbirth = '#dateOfBirthInput';
    readonly subjectsInput = '#subjectsInput';
    readonly currentAddress = '#currentAddress';
    readonly stateCity = '#react-select-3-input';
    readonly submit = '#submit';
    readonly submitSuccess = '##example-modal-sizes-title-lg';
    
    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    public async zoom(number: number) {
        this.page.evaluate(`document.body.style.zoom=${number}`)
    }

    public async fillNameAndEmail(firstName: string, lastName: string, email:string){
        await this.ui.editBox(this.firstName).fillAndTab(firstName);
        await this.ui.editBox(this.lastName).fillAndTab(lastName);
        await this.ui.editBox(this.userEmail).fillAndTab(email);
    } 

    public async fillGenderdNumberBirthAndSubjects(gender: string, mobile: string, subject: string, birth: string){
        await this.ui.element(this.radio_checkbox.item(gender)).click();
        await this.ui.editBox(this.userNumber).fillAndTab(mobile);
        await this.ui.editBox(this.dateOfbirth).fillAndTab(birth);
        await this.ui.editBox(this.subjectsInput).fillAndTab(subject);
    }

    public async fillHobiesPictureAndCurrentAddress(hobies: string, fileName: string, address: string){
        await this.ui.element(this.radio_checkbox.item(hobies)).click();
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.click('text="Choose File"');
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(`/src/resources/uploadFiles/${fileName}`);
        await this.ui.editBox(this.currentAddress).fillAndTab(address);
    }

    public async selectField(select: string, state: string,) {
        await this.page.waitForSelector(`text='${select}'`, { state: 'visible' });
        await this.page.click(`text='${select}'`, {
          force: true,
          timeout: CommonConstants.TWO*1000,
        })
        await this.page.fill(`text='${select}'`, '')
      
        await this.page.click(`[class*=option'] >> text='${state}'`, {
          force: true,
          timeout: CommonConstants.TWO*1000,
        })
    }

    public async submitForm(){
        await this.ui.element(this.submit).click();
    }

    public async validationSubmitSuccess(){
        await test.step(`Verify that user submited successfully`, async () => {
            const textSuccess = await this.ui.element(this.submitSuccess).getTextContent();
            await Assert.assertEquals(textSuccess, "Thanks for submitting the form", "Demo");
            await this.ui.elementbytext("close").click();
        });      
    }
}