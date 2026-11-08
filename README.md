# EcoCash — Payment Prototype

A front-end prototype of the EcoCash loan flow, built from the supplied design
screenshots. Three screens, wired together:

1. **Login** (`index.html`) — phone number with the `+263` Zimbabwe country
   code, 4-digit PIN entry, Login, plus Register / Help & Support.
2. **Loan calculator** (`loan.html`) — loan amount slider (USD 500–50,000),
   term selector (6–60 months), a live monthly-payment estimate, and feature
   cards.
3. **Loan application** (`apply.html`) — applicant details, employment status,
   income, repayment term, and a confirmation checkbox.

## Flow

`Login → Loan calculator → Loan application`

Login goes to the calculator; **Apply Now** carries the chosen amount and term
into the application form as query params, which prefill those fields.

## Running

It's a static site — no build step. Open `index.html` directly, or serve the
folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Scope / notes

This is a **front-end prototype only**. There is no backend: there's no real
authentication, no payment or loan processing, and nothing is stored or sent
anywhere. The monthly-payment figure is a client-side estimate using a fixed
4.5% APR for illustration. Wiring to a real service would be the next step.

## Structure

```
index.html      Login screen
loan.html       Loan calculator
apply.html      Loan application form
css/styles.css  Styles
js/app.js       Interactions + navigation
```
