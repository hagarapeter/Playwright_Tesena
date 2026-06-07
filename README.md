# Playwright Automation Framework

E2E and API test suite built with Playwright (TypeScript) using Page Object Model architecture, data-driven fixtures, and CI/CD via GitHub Actions.

## Setup
```bash
npm install
npx playwright install chromium
```

## Run
```bash
npm test                  # all tests headless
npm run test:ui           # Playwright UI mode
npm run test:report       # open HTML report
npm run test:report       # open HTML report
npx playwright test --project=e2e   # UI tests only
npx playwright test --project=api   # API tests only
```

## Structure
```bash
pages/
  BasePage.ts             # shared base class with common methods
  POManager.ts            # page object factory
  LoginPage.ts
  DashboardPage.ts
  ProductDetails.ts
  CartPage.ts
  UserProfile.ts
tests/
  product-order.spec.ts   # add to cart, verify items
  wishlist.spec.ts        # add to wishlist, remove from wishlist
api/
  users.api.spec.ts       # status codes, response body, response time
fixtures/
  base.ts                 # extended Playwright test with fixture
playwright.config.ts
```

## Tech
```bash
- Playwright & TypeScript
- Page Object Model with shared BasePage
- Data-driven via TypeScript fixtures
- API testing via native Playwright request context
- CI/CD via GitHub Actions (triggered on push/PR)
```
