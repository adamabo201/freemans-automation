import { initDB, upsertFields } from "./db";

const fields = [
  // SHIPPING
  { page: "shipping", selector: "input[name='firstName']", property: "value", value: "Steve", notes: "First name" },
  { page: "shipping", selector: "input[name='lastName']", property: "value", value: "Rosenblum", notes: "Last name" },
  { page: "shipping", selector: "input[name='address1']", property: "value", value: "123 Baker Street", notes: "Address line 1" },
  { page: "shipping", selector: "input[name='townCity']", property: "value", value: "London", notes: "City" },
  { page: "shipping", selector: "input[name='postcode']", property: "value", value: "W1A 1AA", notes: "Postcode" },
  { page: "shipping", selector: "select[name='country']", property: "value", value: "GB", notes: "Country" },
  { page: "shipping", selector: "input[name='emailAddress']", property: "value", value: "steve@example.com", notes: "Email" },
  { page: "shipping", selector: "input[name='phoneNumber']", property: "value", value: "07123456789", notes: "Phone" },

  // BILLING
  { page: "billing", selector: "input[name='billingFirstName']", property: "value", value: "Steve", notes: "Billing first name" },
  { page: "billing", selector: "input[name='billingLastName']", property: "value", value: "Rosenblum", notes: "Billing last name" },
  { page: "billing", selector: "input[name='billingPostcode']", property: "value", value: "W1A 1AA", notes: "Billing postcode" },

  // PAYMENT (fake test card)
  { page: "payment", selector: "input[name='cardNumber']", property: "value", value: "4242424242424242", notes: "Test Visa" },
  { page: "payment", selector: "input[name='cardName']", property: "value", value: "STEVE ROSENBLUM", notes: "Cardholder name" },
  { page: "payment", selector: "input[name='expiryDate']", property: "value", value: "12/29", notes: "Expiry MM/YY" },
  { page: "payment", selector: "input[name='cvv']", property: "value", value: "123", notes: "CVC" }
];

(async () => {
  try {
    await initDB();
    await upsertFields(fields);
    console.log("✅ Seeded Freemans checkout fields.");
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
  }
})();
