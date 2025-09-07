import puppeteer from "puppeteer";
import { openDb, saveField } from "./db";

async function delay(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

async function main() {
  const db = await openDb(); // open database
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  try {
    console.log("🚀 Freemans automation starting...");
    await page.goto("https://www.freemans.com", { waitUntil: "domcontentloaded" });

    // Cookies
    try {
      await page.waitForSelector("button[title='Accept All']", { timeout: 5000 });
      await page.click("button[title='Accept All']");
      console.log("✅ Accepted cookies");
      await saveField(db, "button[title='Accept All']", "click", "Accepted cookies");
    } catch {
      console.log("ℹ️ No cookies banner");
    }

    // Search
    const query = "dress";
    await page.type("#searchBox", query);
    await saveField(db, "#searchBox", "value", query);
    await page.keyboard.press("Enter");
    console.log(`✅ Searched for: ${query}`);
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    // Pick first product
    const productUrl = await page.$eval("a[href*='/products/']", el =>
      (el as HTMLAnchorElement).href.replace("https//", "https://")
    );
    console.log("✅ Picking first product:", productUrl);
    await saveField(db, "a[href*='/products/']", "href", productUrl);
    await page.goto(productUrl, { waitUntil: "domcontentloaded" });

    // Select a valid size
    const sizes = await page.$$eval(".productOptionItem", els =>
      els.map(el => ({
        text: el.textContent?.trim() || "",
        disabled: el.classList.contains("disabled")
      }))
    );
    console.log("ℹ️ Items:", sizes);

    const valid = sizes.find(s => /^\d+$/.test(s.text) && !s.disabled);
    if (!valid) throw new Error("❌ No valid size found");

    const sizeHandle = await page.$(`.productOptionItem[data-optiontext='${valid.text}']`);
    if (!sizeHandle) throw new Error(`❌ Could not locate size ${valid.text}`);

    await sizeHandle.evaluate(el => {
      el.scrollIntoView({ block: "center" });
      (el as HTMLElement).click();
    });
    console.log(`✅ Selected size: ${valid.text}`);
    await saveField(db, ".productOptionItem", "click", valid.text);
    await delay(1500);

    // Add to Bag
    await page.waitForSelector(".bagButton--add", { timeout: 10000 });
    await page.click(".bagButton--add", { delay: 200 });
    console.log("✅ Clicked Add to Bag");
    await saveField(db, ".bagButton--add", "click", "Add to Bag");

    // Bag page
    await delay(3000);
    await page.goto(
      "https://www.freemans.com/web/main/bag.asp?realestate=siteheaderlinks&linkname=bag",
      { waitUntil: "domcontentloaded" }
    );
    console.log("✅ Opened Bag page (bag.asp)");

    // Checkout Securely
    await page.waitForSelector("#proceedbutton2", { timeout: 15000 });
    await page.click("#proceedbutton2");
    console.log("✅ Clicked Checkout Securely");
    await saveField(db, "#proceedbutton2", "click", "Checkout Securely");

    // Continue as Guest
    await page.waitForSelector("#registerLink", { timeout: 15000 });
    await page.click("#registerLink");
    console.log("✅ Continued as Guest");
    await saveField(db, "#registerLink", "click", "Continue as Guest");
    await delay(2000);

    // Fill About You
    const postcode = "AB10 6DN";
    await page.type("#postCode", postcode);
    console.log(`✅ Entered postcode: ${postcode}`);
    await saveField(db, "#postCode", "value", postcode);

    await page.click("#searchAddressImageButton");
    console.log("✅ Clicked Find Address");
    await saveField(db, "#searchAddressImageButton", "click", "Find Address");
    await delay(4000);

    await page.select("#Title", "Mr");
    await saveField(db, "#Title", "value", "Mr");

    await page.$eval("#FirstName", el => (el as HTMLInputElement).value = "");
    await page.type("#FirstName", "Test");
    await saveField(db, "#FirstName", "value", "Test");

    await page.$eval("#LastName", el => (el as HTMLInputElement).value = "");
    await page.type("#LastName", "User");
    await saveField(db, "#LastName", "value", "User");

    await page.$eval("#houseId", el => (el as HTMLInputElement).value = "");
    await page.type("#houseId", "12");
    await saveField(db, "#houseId", "value", "12");

    await page.$eval("#address_1", el => (el as HTMLInputElement).value = "");
    await page.type("#address_1", "123 Test Street");
    await saveField(db, "#address_1", "value", "123 Test Street");

    await page.$eval("#address_2", el => (el as HTMLInputElement).value = "");
    await page.type("#address_2", "Flat 4B");
    await saveField(db, "#address_2", "value", "Flat 4B");

    await page.$eval("#city", el => (el as HTMLInputElement).value = "");
    await page.type("#city", "Testville");
    await saveField(db, "#city", "value", "Testville");

    await page.$eval("#post_code", el => (el as HTMLInputElement).value = "");
    await page.type("#post_code", "AB10 6DN");
    await saveField(db, "#post_code", "value", "AB10 6DN");

    await page.$eval("#DayTimeTelephone", el => (el as HTMLInputElement).value = "");
    await page.type("#DayTimeTelephone", "07123456789");
    await saveField(db, "#DayTimeTelephone", "value", "07123456789");

    await page.select("#dob_day", "01");
    await saveField(db, "#dob_day", "value", "01");

    await page.select("#dob_month", "01");
    await saveField(db, "#dob_month", "value", "01");

    await page.select("#dob_year", "1990");
    await saveField(db, "#dob_year", "value", "1990");

    await page.type("#Email", "test123@example.com");
    await saveField(db, "#Email", "value", "test123@example.com");

    await page.type("#ConfirmEmail", "test123@example.com");
    await saveField(db, "#ConfirmEmail", "value", "test123@example.com");

    await page.type("#Password", "TestPass123!");
    await saveField(db, "#Password", "value", "TestPass123!");

    await page.type("#confirmPassword", "TestPass123!");
    await saveField(db, "#confirmPassword", "value", "TestPass123!");

    console.log("✅ Filled About You form");

    // Continue
    await page.waitForSelector("#applybutton", { timeout: 15000 });
    await page.click("#applybutton");
    console.log("✅ Clicked Continue (About You)");

    // Delivery Options
    await page.waitForSelector("#safePlaceSelect", { timeout: 15000 });
    await page.select("#safePlaceSelect", "B:Garage");
    await saveField(db, "#safePlaceSelect", "value", "B:Garage");
    console.log("✅ Selected safe place: Garage");

    await page.waitForSelector("#applybutton", { timeout: 15000 });
    await page.click("#applybutton");
    console.log("✅ Clicked Continue (Delivery Options)");

    await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 20000 });

    // Payment
    await page.waitForSelector("#cashPaymentChoice", { timeout: 20000 });
    await page.$eval("#cashPaymentChoice", el => (el as HTMLInputElement).click());
    await saveField(db, "#cashPaymentChoice", "click", "Pay Now with Card");
    console.log("✅ Selected payment method: Pay Now with Card");

    await page.waitForSelector("#applybutton", { timeout: 15000 });
    await page.$eval("#applybutton", el => (el as HTMLInputElement).click());
    console.log("✅ Clicked Continue (Payment Method)");

    await page.waitForSelector("#CardHolderName", { timeout: 15000 });
    await page.type("#CardHolderName", "Test User");
    await saveField(db, "#CardHolderName", "value", "Test User");

    await page.type("#CardNumber", "4111111111111111");
    await saveField(db, "#CardNumber", "value", "4111111111111111");

    await page.type("#ExpiryDateMonthYear", "12/30");
    await saveField(db, "#ExpiryDateMonthYear", "value", "12/30");

    await page.type("#CardSecurityCode", "123");
    await saveField(db, "#CardSecurityCode", "value", "123");

    console.log("✅ Filled payment form");

    await page.waitForSelector("#applybutton", { timeout: 20000 });
    await page.$eval("#applybutton", el => (el as HTMLInputElement).click());
    console.log("✅ Clicked Confirm & Pay (final step)");
    await browser.close();
    process.exit(0);


  } catch (err) {
    console.error("❌ Error during automation:", err);
  }
}

main();