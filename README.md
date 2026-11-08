# EcoCash — Payment Prototype

A front-end prototype of the EcoCash loan flow, built from the supplied design
screenshots. Three screens, wired together:

1. **Loan calculator** (`index.html`) — loan amount slider (USD 500–50,000),
   term selector (6–60 months), a live monthly-payment estimate, and feature
   cards. This is the landing page.
2. **Loan application** (`apply.html`) — applicant details, employment status,
   income, repayment term, and a confirmation checkbox.
3. **PIN / login** (`pin.html`) — phone number with the `+263` Zimbabwe country
   code, 4-digit PIN entry, Login, plus Register / Help & Support.
4. **OTP verification** (`otp.html`) — 6-digit one-time code entry with a
   masked destination number and a resend countdown.

## Flow

`Loan calculator → Loan application → PIN → OTP`

**Apply Now** carries the chosen amount and term into the application form as
query params, which prefill those fields. Submitting the form goes on to the
PIN page, and Login proceeds to the OTP verification page.

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
index.html      Loan calculator (landing, responsive)
apply.html      Loan application form
pin.html        PIN / login screen
otp.html        OTP verification screen
css/styles.css  Styles
js/app.js       Interactions + navigation
```
