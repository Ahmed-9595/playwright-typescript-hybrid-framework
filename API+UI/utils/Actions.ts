import { expect, Locator, Page } from "@playwright/test";
export default class Actions {

constructor(private page: Page) { 

}

  async scrollToViewCenter(locator: Locator) {
    await locator.evaluate((el) => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  async scrollByPixels(x: number, y: number) {
    await this.page.mouse.wheel(x, y);
    //await this.page.waitForLoadState("domcontentloaded").catch(() => {});
  }

  // بديل الـ Fluent Wait في سيليني
  async waitForElementToBeHidden(locator: Locator, timeout?: number): Promise<void> {
    await locator.first()
      .waitFor({
        state: "hidden",
        timeout: timeout
      })
      .catch(() => {
        console.log("No hidden element found");
      });
  }
 


  async inteljWaitForElementToBeHidden(locator: Locator, timeout?: number): Promise<void> {

    console.log("Waiting for element to be hidden...");
    try{

    await expect(locator.first()).toBeHidden({ timeout: timeout ?? 15000 });
    }catch (error) {
      console.log("No hidden element found");
    }

    console.log("Element is officially hidden from UI");
  }

  async waitForClickable(
    locator: Locator,
    timeout: number = 15000,
  ): Promise<void> {
    // 1. الانتظار الأساسي لبلاي رايت (وجود العنصر في الـ DOM وظهوره)
    await locator.waitFor({ state: "visible", timeout });

    // 2. الانتظار المتقدم باستخدام الـ Lambda (الشرط المخصص)
    const handle = await locator.elementHandle();

    if (handle) {
      await this.page.waitForFunction(
        (el) => {
          const element = el as HTMLElement;
          // التأكد أنه ليس disabled (كـ attribute)
          const isNotDisabled = !(element as HTMLButtonElement).disabled;
          // التأكد أن الـ Class لا يحتوي على disabled (شائع في Magento)
          const isNotDisabledByClass = !element.classList.contains("disabled");
          // التأكد أن العنصر يستقبل الـ Events (وليس مغطى بـ Overlay)
          const hasPointerEvents =
            window.getComputedStyle(element).pointerEvents !== "none";
          // التأكد من أن الـ Opacity كافية (أحياناً يكون العنصر مخفي تدريجياً)
          const isVisibleStyle =
            window.getComputedStyle(element).opacity !== "0";

          return (
            isNotDisabled &&
            isNotDisabledByClass &&
            hasPointerEvents &&
            isVisibleStyle
          );
        },
        handle,
        { timeout },
      );
    } else {
      throw new Error(`Could not get element handle for locator: ${locator}`);
    }
  }
  public async waitForElementToBeVisible(
    locator: Locator,
    timeout?: number,
  ): Promise<Locator> {
    await locator.waitFor({ state: "visible", timeout });
    return locator;
  }

  public async waitForPresenceOfElement(
    locator: Locator,
    timeout?: number,
  ): Promise<Locator> {
    await locator.waitFor({ state: "attached", timeout });
    return locator;
  }


  public async waitForVisibilityOfAllElements(
    locator: Locator,
    timeout?: number,
  ): Promise<void> {
    // هنستنى لحد ما أول عنصر في المجموعة يبقى Visible
    await locator
      .first()
      .waitFor({ state: "visible", timeout })
      .catch(() => { });
    // تأكيد إضافي إن العدد أكبر من 0
    await expect(async () => {
      const count = await locator.count();
      if (count === 0) throw new Error("No elements found");
    }).toPass({ intervals: [1000] });
  }

  public async waitForPresenceOfAllElements(
    locator: Locator,
    timeout?: number,
  ): Promise<Locator[]> {
    // هنستنى لحد ما أول عنصر في المجموعة يبقى Visible
    await locator
      .first()
      .waitFor({ state: "attached", timeout })
      .catch(() => { });
    // تأكيد إضافي إن العدد أكبر من 0
    await expect(async () => {
      const count = await locator.count();
      if (count === 0) throw new Error("No elements found");
    }).toPass({ timeout });
    return locator.all();
  }


  async isElementDisplayed(
    locator: Locator,
    timeout?: number,
  ): Promise<boolean> {
    try {
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible({ timeout });
      console.log("Element is visible");
      return true;
    } catch (error) {
      return false;
    }
  }

  async isItemsDisplayed(locator: Locator, timeout?: number): Promise<boolean> {
    let retry = 0;
    const maxRetries = 3;
    while (retry < maxRetries) {
      try {
        await locator.first().scrollIntoViewIfNeeded({ timeout: timeout });
        await locator.first().waitFor({ state: "visible", timeout: timeout });

        const elementsCount = await locator.count();
        return elementsCount > 0;
      } catch (error) {
        retry++;
      }
    }
    console.log("Items did not appear");
    return false;
  }

  async clickUntilStable(locator: Locator, isDisplayed: () => Promise<boolean>) {

    await expect(async () => {
      await locator.click({ timeout: 10000 }).catch(() => locator.dispatchEvent("click"));
      const result = await isDisplayed();
      if (!result) throw new Error("Element is not clickable");
    }).toPass({ intervals: [1000] });

  }

  async hoverUntilStable(locator: Locator, isDisplayed: () => Promise<boolean>) {
     await expect(async () => {
      
      await locator.hover();
      const result = await isDisplayed();
      if (!result) throw new Error("Element is not hovered");
    }).toPass({ intervals: [1000] });
  }

  async clearField(locator: Locator) {
    await locator.click();
    await this.page.keyboard.press("ControlOrMeta+A");
    await this.page.keyboard.press("Backspace");
    console.log("Field cleared successfully");
  }

  async getVisibleLocator(locator: Locator): Promise<Locator> {
    const count = await locator.count();
    
    for (let i = 0; i < count; i++) {
        const item = locator.nth(i);
        if (await item.isVisible({timeout: 5000})) {
            return item;
        }
    }
    
    throw new Error("No visible element found for the given locator");
}


async selectOption(locator: Locator, visibleText: string) {


// 1. الضغط على الـ Dropdown لفتحه
    await locator.first().waitFor({ state: "visible"}); 
    await locator.first().click();

    // 2. تحديد كل الخيارات المتاحة في القائمة
    const optionsLocator =this.page.locator("//div[@role='option' or contains(@class,'oxd-select-option')]");


    // 3. البحث أولاً عن المطابقة التامة (Exact match)
    let targetOption = optionsLocator.filter({ hasText: new RegExp(`^\\s*${visibleText.trim()}\\s*$`, 'i') });

    // 4. Fallback: لو لم يجد مطابقة تامّة، يبحث عن المطابقة الجزئية (Contains)
    if (await targetOption.count() === 0) {
        targetOption = optionsLocator.filter({ hasText: visibleText.trim() });
    }

    // 5. التحقق من وجود العنصر
    if (await targetOption.count() === 0) {
        throw new Error(`Option not found: ${visibleText}`);
    }

    // 6. الضغط على العنصر (Playwright بيعمل Scroll into view و Wait أوتوماتيك)
    try {
        await targetOption.first().click();
        console.log(`Clicked on ${visibleText} using regular click`);
    } catch (error) {
        // Fallback للـ Force Click لو فيه Overlay مغطي على العنصر
        await targetOption.first().click({ force: true });
        console.log(`Clicked on ${visibleText} using JS/Force click`);
    }


}
}