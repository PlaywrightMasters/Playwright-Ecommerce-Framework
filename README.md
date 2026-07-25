# Playwright E-Commerce Test Automation Framework

[![Playwright Tests](https://github.com/chiranjib-dhar/playwright-ecommerce-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/chiranjib-dhar/playwright-ecommerce-framework/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.62-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)

End-to-end test automation framework built with **Playwright + TypeScript**,
using the **Page Object Model (POM)** pattern against
[SauceDemo](https://www.saucedemo.com), a public e-commerce demo site used
for QA practice.

This is the flagship repo in a small portfolio of test-automation projects
demonstrating current (2026) industry practice: typed page objects, custom
fixtures, parallel cross-browser execution, HTML reporting, and CI on every
push via GitHub Actions.

## Tech stack

| Layer            | Choice                                   |
|------------------|-------------------------------------------|
| Test runner      | `@playwright/test`                        |
| Language         | TypeScript                                |
| Design pattern   | Page Object Model + Playwright fixtures   |
| Browsers         | Chromium, Firefox, WebKit                 |
| CI               | GitHub Actions (`.github/workflows/playwright.yml`) |
| Reporting        | Playwright HTML reporter                  |

## Prerequisites

- **Node.js 18+** (LTS recommended) — check with `node --version`
- **npm** (bundled with Node.js) — check with `npm --version`
- Git

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/chiranjib-dhar/playwright-ecommerce-framework.git
cd playwright-ecommerce-framework

# 2. Install dependencies
npm install

# 3. Download the browser binaries Playwright drives (Chromium, Firefox, WebKit)
npx playwright install
```

That's it — no `.env` file or API keys needed. The suite runs against the
public SauceDemo site with its published test credentials.

## Running the tests

```bash
npm test                # all specs, all 3 browsers, headless
npm run test:chromium   # Chromium only — fastest inner-loop
npm run test:headed     # watch the browser while tests run
npm run test:ui         # Playwright's interactive UI mode (recommended for debugging)
npm run test:debug      # step through with Playwright Inspector
```

View the HTML report after any run:

```bash
npm run report
```

Generate new locators/steps by recording actions in a real browser:

```bash
npm run codegen
```

## Project structure

```
playwright-ecommerce-framework/
├── .github/workflows/playwright.yml   # CI: installs deps, runs tests, uploads HTML report
├── src/
│   ├── pages/                         # Page Object Model classes
│   │   ├── login.page.ts              # Login form locators + actions
│   │   └── inventory.page.ts          # Product listing locators + actions
│   └── fixtures/
│       └── pages.fixture.ts           # Extends Playwright's `test` to inject page objects
├── tests/
│   └── login.spec.ts                  # Login + cart specs, consuming the fixtures above
├── playwright.config.ts               # Base URL, reporters, trace/screenshot/video policy
├── tsconfig.json
└── package.json
```

**Why this structure:** page objects hold locators and low-level actions;
fixtures wire page objects into `test` so specs never call `new LoginPage(page)`
directly; specs stay readable and only describe behavior. This is the pattern
Playwright's own docs recommend for framework-scale suites, not just the
single-file examples in the quickstart.

## What's covered

`tests/login.spec.ts` exercises three scenarios against SauceDemo:

1. **Standard login** — valid credentials land on the Products (inventory) page.
2. **Locked-out user** — SauceDemo's `locked_out_user` fixture account surfaces
   the expected error message.
3. **Add to cart** — adding an item updates the cart badge count.

This is deliberately a first slice (login + cart), not the full checkout
flow — the framework scaffolding (POM, fixtures, config, CI) is the priority
of this first pass; more specs land as the suite grows.

## Continuous Integration

Every push and pull request to `main` runs the full suite on Ubuntu via
GitHub Actions (`.github/workflows/playwright.yml`):
installs dependencies → installs browsers with OS-level deps
(`playwright install --with-deps`) → runs `npx playwright test` → uploads
the HTML report as a build artifact (30-day retention).

## Troubleshooting

**WebKit fails locally on Windows with `Host system is missing dependencies!
... lcms2-2.dll`, but Chromium/Firefox work fine.**
This is a known Windows-only gap in WebKit's runtime dependencies, not a bug
in this project. Install (or repair) the
[Microsoft Visual C++ Redistributable (x64)](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)
and re-run `npx playwright install webkit`. It does not affect CI — GitHub
Actions runs on Ubuntu, where `playwright install --with-deps` installs the
correct OS packages automatically.

**`npx playwright install` is slow / times out.**
It downloads real browser binaries (~150–200 MB each for Chromium/Firefox,
~60 MB for WebKit). Re-run the command; downloads resume rather than restart
from zero on most networks.

## About this project

Built as part of a self-directed QA automation portfolio — see
[AI-ASSISTED.md](./AI-ASSISTED.md) for exactly how Claude was used to scaffold
this repo and what was reviewed/decided by hand.

## License

[MIT](./LICENSE)
