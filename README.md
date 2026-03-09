# Packtica Audit

A lightweight multi-step audit form for Packtica that collects company details, scores packaging-related pain points, and generates a result summary with recommendations.

## What It Does

- Collects lead and company information
- Guides users through a 3-step audit flow
- Calculates overall and bucket-based scores
- Highlights top pain points
- Shows recommendation cards based on weak areas and stated interests
- Prepares a WhatsApp message from the completed audit

## Project Files

- `index.html`: page structure and audit screens
- `style.css`: layout, buttons, forms, and results styling
- `app.js`: form state, validation, scoring, recommendations, and WhatsApp link generation

## Local Usage

1. Open `index.html` in a browser.
2. Complete the form and review the generated results.

## Important Setup

Before using the WhatsApp button in production, replace the placeholder value in `app.js`:

```js
const WHATSAPP_NUMBER = "60XXXXXXXXX";
```

Use international format with digits only, for example:

```js
const WHATSAPP_NUMBER = "60123456789";
```

## Deployment

This project can be hosted directly with GitHub Pages because it is a static site.

Expected Pages URL:

`https://nyak33.github.io/Packtica_Audit/`
