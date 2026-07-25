# AI-Assisted Development Log

Honest record of where Claude (Anthropic) was used while building this repo,
and where human judgment directed or corrected it. Updated as the project grows.

## Why this file exists

I use Claude as an accelerator, not a replacement for understanding the code.
Every line here is something I can explain in an interview — this log is the
paper trail for that claim.

## 2026-07-26 — Initial scaffold

**What Claude did:**
- Ran the official Playwright installer (`npm init playwright@latest`) with
  TypeScript, all three browsers, and GitHub Actions CI selected.
- Wrote the initial Page Object Model classes (`LoginPage`, `InventoryPage`),
  a Playwright fixture (`pages.fixture.ts`) to inject them into tests, and the
  first spec file (`login.spec.ts`) covering login success, login failure,
  and add-to-cart.
- Updated `playwright.config.ts` (base URL, HTML + list reporters,
  screenshot/video/trace policy) and added `tsconfig.json`.
- Ran the suite locally against all three browsers, hit a Windows-only WebKit
  dependency error (`lcms2-2.dll`), researched the cause, and documented the
  fix (VC++ Redistributable) in the README instead of silently ignoring it.
- Drafted this README and this log.

**What I decided / reviewed:**
- Repo location and scope: this stays a public, recruiter-facing repo (not
  folded into private planning); confirmed before any file was created.
- Language choice: TypeScript over JavaScript, matching what current European
  QA job postings expect.
- Target site and locator strategy: SauceDemo, using its documented
  `data-test` attributes and IDs — I checked the actual page source rather
  than trusting the locators blind.
- Scope for this first pass: login + cart only. The full checkout flow,
  additional test data, and Allure-style reporting are deliberately deferred
  to keep this slice small and fully understood before extending it.
- Verified all tests actually pass locally (not just "code looks right") and
  read the generated CI workflow line by line before treating it as done.

## How I use this file going forward

Every future session that adds meaningfully to this repo gets a dated entry
above, in the same "what Claude did / what I decided" split.
