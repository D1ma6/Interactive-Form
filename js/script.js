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
  // local variables
  const formTitle = form.querySelector("#title");
  const otherInput = form.querySelector("#other-title");
  otherInput.style.display = "none";

  // add event listener to the `other` option to display the input
  formTitle.addEventListener("change", (e) => {
    e.target.value === "other"
      ? (otherInput.style.display = "")
      : (otherInput.style.display = "none");
  });
};
jobInput();

/****
 ** `tShirt` function reveals the `color` options when
 ** the other option in the selection with an id of
 ** `design` is selected
 ****/
const tShirt = () => {
  // local variables
  const designOpt = form.querySelector("#design");
  const colorOpt = form.querySelector("#color");

  // display none and change the text of the label
  colorOpt.style.display = "none";
  const label = colorOpt.previousElementSibling;
  label.textContent = "Please select a T-shirt theme";

  designOpt.addEventListener("change", (e) => {
    // function to choose the values f the color Options when a design is selected
    const colorOptions = (val1, val2, val3) => {
      for (let i = 0; i < colorOpt.options.length; i++) {
        const opt = colorOpt.options[i];
        if (opt.value == val1 || opt.value == val2 || opt.value == val3) {
          opt.disabled = false;
          opt.selected = true;
        } else {
          opt.disabled = true;
        }
      }
      colorOpt.style.display = "";
      label.textContent = "Color:";
    };

    // if-else statement to show the colors available when a design is selected
    e.target.value == "js puns"
      ? colorOptions("cornflowerblue", "darkslategrey", "gold")
      : e.target.value == "heart js"
      ? colorOptions("tomato", "steelblue", "dimgrey")
      : (colorOpt.style.display = "none") &&
        (label.textContent = "Please select a T-shirt theme");
  });
};
tShirt();

/****
 ** `activities` function listens when the options
 ** are selected and shows abailable ones
 ****/
const activities = () => {
  // local variables
  const field = form.querySelector(".activities");
  const events = field.querySelectorAll("input");

  // creating total element
  const total = document.createElement("label");
  total.id = "total";
  field.appendChild(total);
  let amount = 0;

  // adding an event listener to change the total value when the checkbox is selected and to show the checkboxes that are available
  field.addEventListener("change", (e) => {
    const opt = e.target;
    for (let i = 0; i < events.length; i++) {
      // local variables
      const event = events[i];
      const eventsData = events[i].dataset.dayAndTime;
      const optData = opt.dataset.dayAndTime;

      // disabler function
      const disabler = (val1, val2) => {
        event.disabled = val1;
        opt.disabled = val2;
      };

      // disable when the events are o the same day and time
      optData == eventsData ? disabler(true, false) : null;
      opt.checked == false && optData == eventsData
        ? disabler(false, false)
        : null;
    }

    // when the event is `checked` add the value to the total
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
  // local variables
  const field = form.querySelector("#payment");
  const creditCard = form.querySelector(".credit-card");
  const paypal = form.querySelector(".paypal");
  const bitcoin = form.querySelector(".bitcoin");

  // set the display to none
  paypal.style.display = "none";
  bitcoin.style.display = "none";
  creditCard.style.display = "none";

  // event listener to see what payment method is selected
  field.addEventListener("change", (e) => {
    const opt = e.target.value;

    // function to display or hide the options
    const dispay = (val1, val2, val3) => {
      creditCard.style.display = val1;
      paypal.style.display = val2;
      bitcoin.style.display = val3;
    };

    // if-else statement to show the chosen option
    opt == "credit card"
      ? dispay("", "none", "none")
      : opt == "paypal"
      ? dispay("none", "", "none")
      : opt == "bitcoin"
      ? dispay("none", "none", "")
      : dispay("none", "none", "none");
  });
};
payment();

/****
 ** `validation` checks if all the forms
 ** are valid to submit
 ****/
const validation = () => {
  // local variables
  const btn = form.querySelector("#btn");
  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#mail");
  const payment = form.querySelector("#payment");
  const paymentSpan = form.querySelector(".payment > legend > span");
  const creditCard = form.querySelectorAll(".credit-card input");

  const field = form.querySelector(".activities");
  const span = field.querySelector("legend > span");
  const label = field.querySelectorAll("label");

  // hide the spans
  paymentSpan.style.display = "none";
  span.style.display = "none";

  // mail regex
  const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // event listener when the form is submited
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkedOne = Array.prototype.slice
      .call(checkboxes)
      .some((x) => x.checked);

    // function to set the border value
    const border = (val1, val2) => {
      emailField.style.border = val1;
      nameField.style.border = val2;
    };

    // check if the values of the emil and name fields
    mailRegex.test(emailField.value) && nameField.value !== ""
      ? border("", "")
      : mailRegex.test(emailField.value)
      ? border("", "2px solid red")
      : nameField.value !== ""
      ? border("2px solid red", "")
      : border("2px solid red", "2px solid red");

    // check if at least one input is checked
    checkedOne ? (span.style.display = "none") : (span.style.display = "block");

    // check if payment method is selected and filled
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

            // check if the card number is valid
            /^\d{16}$/g.test(creditCard[0].value)
              ? (creditCard[0].style.border = "")
              : (creditCard[0].style.border = "2px solid red");

            // check if the CVV is valud
            /^\d{3}$/g.test(creditCard[2].value)
              ? (creditCard[2].style.border = "")
              : (creditCard[2].style.border = "2px solid red");
          }
        });
      }
    }
  });
};
validation();
