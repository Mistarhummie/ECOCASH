/* EcoCash prototype — front-end only.
   This is a mock UI: no real payment/loan processing or backend calls. */

(function () {
  "use strict";

  function toast(message) {
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 300);
    }, 2200);
  }

  /* ---------------- Login screen ---------------- */
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    var pinGroup = document.getElementById("pin-group");
    var boxes = pinGroup ? Array.prototype.slice.call(pinGroup.querySelectorAll(".pin-box")) : [];

    boxes.forEach(function (box, i) {
      box.addEventListener("input", function () {
        box.value = box.value.replace(/\D/g, "");
        if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
      });
      box.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !box.value && i > 0) boxes[i - 1].focus();
      });
    });

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var pin = boxes.map(function (b) { return b.value; }).join("");
      if (pin.length < 4) {
        toast("Please enter your 4-digit PIN");
        return;
      }
      window.location.href = "loan.html";
    });
  }

  /* ---------------- Loan calculator ---------------- */
  var slider = document.getElementById("amount-slider");
  if (slider) {
    var amountEl = document.getElementById("loan-amount");
    var termDisplay = document.getElementById("term-display");
    var monthlyEl = document.getElementById("monthly-payment");
    var termGrid = document.getElementById("term-grid");
    var applyBtn = document.getElementById("apply-now");

    var ANNUAL_RATE = 0.045; // 4.5% APR shown on the card
    var state = { amount: Number(slider.value), term: 12 };

    function fmt(n) {
      return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
    }

    function monthlyPayment(principal, months) {
      var r = ANNUAL_RATE / 12;
      if (r === 0) return principal / months;
      var m = principal * r / (1 - Math.pow(1 + r, -months));
      return m;
    }

    function render() {
      amountEl.textContent = fmt(state.amount);
      termDisplay.textContent = state.term + " months";
      var pay = monthlyPayment(state.amount, state.term);
      monthlyEl.textContent = "$" + pay.toLocaleString("en-US", {
        minimumFractionDigits: 2, maximumFractionDigits: 2
      });
    }

    slider.addEventListener("input", function () {
      state.amount = Number(slider.value);
      render();
    });

    termGrid.addEventListener("click", function (e) {
      var btn = e.target.closest(".term-btn");
      if (!btn) return;
      termGrid.querySelectorAll(".term-btn").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      state.term = Number(btn.dataset.term);
      render();
    });

    applyBtn.addEventListener("click", function () {
      var params = new URLSearchParams({
        amount: String(state.amount),
        term: String(state.term)
      });
      window.location.href = "apply.html?" + params.toString();
    });

    render();
  }

  /* ---------------- Application form ---------------- */
  var appForm = document.getElementById("application-form");
  if (appForm) {
    // Prefill from the calculator selections, when present.
    var qs = new URLSearchParams(window.location.search);
    var amount = qs.get("amount");
    var term = qs.get("term");
    if (amount) {
      var amtInput = appForm.querySelector('[name="loanAmount"]');
      if (amtInput) amtInput.value = amount;
    }
    if (term) {
      var repay = appForm.querySelector('[name="repayment"]');
      if (repay) repay.value = term;
    }

    appForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!appForm.checkValidity()) {
        appForm.reportValidity();
        return;
      }
      if (!document.getElementById("confirm").checked) {
        toast("Please confirm the terms and conditions");
        return;
      }
      toast("Application submitted — we'll be in touch within 24 hours.");
      appForm.reset();
    });
  }
})();
