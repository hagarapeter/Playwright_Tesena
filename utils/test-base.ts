import { test as baseTest } from "@playwright/test";
interface testDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const test = baseTest.extend<{
  testDataForOrder: testDataForOrder;
}>({
  testDataForOrder: {
    username: "seznam@seznam.cz",
    password: "Qwerty12!Qwerty12",
    productName: "Brown bear",
  },
});
