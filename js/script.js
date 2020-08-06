// global variables
const form = document.querySelector("form");

// focus on load
window.addEventListener("load", () => {
  form.querySelector("#name").focus();
});

/****
 ** `jobInput` function reveals the input when
 ** the other option in the selection with an id of
 ** `title` is selected
 ****/
const jobInput = () => {
  const formTitle = form.querySelector("#title");
  const otherInput = form.querySelector("#other-title");
  otherInput.style.display = "none";
  formTitle.addEventListener("change", (e) => {
    if (e.target.value === "other") {
      otherInput.style.display = "";
    } else {
      otherInput.style.display = "none";
    }
  });
};
jobInput();

/****
 ** `tShirt` function reveals the `color` options when
 ** the other option in the selection with an id of
 ** `design` is selected
 ****/
const tShirt = () => {
  // variables
  const designOpt = form.querySelector("#design");
  const colorOpt = form.querySelector("#color");

  // display none and change the text of the label
  colorOpt.style.display = "none";
  const label = colorOpt.previousElementSibling;
  label.textContent = "Please select a T-shirt theme";

  designOpt.addEventListener("change", (e) => {
    if (e.target.value == "js puns") {
      for (let i = 0; i < colorOpt.options.length; i++) {
        const opt = colorOpt.options[i];
        if (
          opt.value == "cornflowerblue" ||
          opt.value == "darkslategrey" ||
          opt.value == "gold"
        ) {
          opt.disabled = false;
          opt.selected = true;
        } else {
          opt.disabled = true;
        }
      }
      colorOpt.style.display = "";
      label.textContent = "Color:";
    } else if (e.target.value == "heart js") {
      for (let i = 0; i < colorOpt.options.length; i++) {
        const opt = colorOpt.options[i];
        if (
          opt.value == "tomato" ||
          opt.value == "steelblue" ||
          opt.value == "dimgrey"
        ) {
          opt.disabled = false;
          opt.selected = true;
        } else {
          opt.disabled = true;
        }
      }
      colorOpt.style.display = "";
      label.textContent = "Color:";
    } else {
      colorOpt.style.display = "none";
      label.textContent = "Please select a T-shirt theme";
    }
  });
};
tShirt();

/****
 ** `activities` function listens when the options
 ** are selected and shows abailable ones
 ****/
const activities = () => {
  const field = form.querySelector(".activities");
  const events = field.querySelectorAll("input");

  const total = document.createElement("label");
  total.id = "total";
  field.appendChild(total);
  let amount = 0;

  field.addEventListener("change", (e) => {
    const opt = e.target;
    for (let i = 0; i < events.length; i++) {
      if (opt.dataset.dayAndTime == events[i].dataset.dayAndTime) {
        events[i].disabled = true;
        opt.disabled = false;
      }
      if (
        opt.checked == false &&
        opt.dataset.dayAndTime == events[i].dataset.dayAndTime
      ) {
        events[i].disabled = false;
        opt.disabled = false;
      }
    }

    opt.checked
      ? (amount += parseInt(opt.dataset.cost))
      : (amount -= parseInt(opt.dataset.cost));
    total.textContent = `Total: ${amount}`;
  });
};
activities();

/****
 ** `payment` function displays the payment
 ** that has been selected
 ****/
const payment = () => {
  const field = form.querySelector("#payment");

  const creditCard = form.querySelector(".credit-card");
  const paypal = form.querySelector(".paypal");
  const bitcoin = form.querySelector(".bitcoin");
  paypal.style.display = "none";
  bitcoin.style.display = "none";
  creditCard.style.display = "none";

  field.addEventListener("change", (e) => {
    const opt = e.target.value;
    if (opt == "credit card") {
      creditCard.style.display = "";
      paypal.style.display = "none";
      bitcoin.style.display = "none";
    } else if (opt == "paypal") {
      paypal.style.display = "";
      bitcoin.style.display = "none";
      creditCard.style.display = "none";
    } else if (opt == "bitcoin") {
      bitcoin.style.display = "";
      creditCard.style.display = "none";
      paypal.style.display = "none";
    } else {
      creditCard.style.display = "";
      paypal.style.display = "none";
      bitcoin.style.display = "none";
    }
  });
};
payment();

/****
 ** `validation` checks if all the forms
 ** are valid to submit
 ****/
const validation = () => {
  const btn = form.querySelector("#btn");

  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#mail");
  const payment = form.querySelector("#payment");
  const paymentSpan = form.querySelector(".payment > legend > span");
  const creditCard = form.querySelectorAll(".credit-card input");
  paymentSpan.style.display = "none";
  const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const field = form.querySelector(".activities");
  const span = field.querySelector("legend > span");
  span.style.display = "none";
  const label = field.querySelectorAll("label");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkedOne = Array.prototype.slice
      .call(checkboxes)
      .some((x) => x.checked);

    if (mailRegex.test(emailField.value) && nameField.value !== "") {
      emailField.style.border = "";
      nameField.style.border = "";
    } else if (mailRegex.test(emailField.value)) {
      nameField.style.border = "2px solid red";
    } else if (nameField.value !== "") {
      emailField.style.border = "2px solid red";
    } else {
      emailField.style.border = "2px solid red";
      nameField.style.border = "2px solid red";
    }

    if (checkedOne) {
      span.style.display = "none";
    } else {
      span.style.display = "block";
    }

    if (payment.options[0].selected) {
      paymentSpan.style.display = "block";
    } else {
      paymentSpan.style.display = "none";
      if (payment.options[1].selected) {
        Array.prototype.slice.call(creditCard).some((x) => {
          if (x.value == "") {
            x.style.border = "2px solid red";
          } else {
            x.style.border = "";
            console.log(creditCard[0].value);
            if (/^\d{16}$/g.test(creditCard[0].value)) {
              creditCard[0].style.border = "";
            } else {
              creditCard[0].style.border = "2px solid red";
            }
            if (/^\d{3}$/g.test(creditCard[2].value)) {
              creditCard[2].style.border = "";
            } else {
              creditCard[2].style.border = "2px solid red";
            }
          }
        });
      }
    }
  });
};
validation();
