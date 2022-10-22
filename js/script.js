/*****************************************************************************
Treehouse FSJS Techdegree:
Project 3 - Interactive Form
Interactive Form with various functionality and field validation.
******************************************/

const nameField = document.getElementById("name");
nameField.focus();
//Hide the 'other role' field by default when the page loads
const otherRoleField = document.getElementById("other-job-role");
otherRoleField.style.display = "none";
const jobRoleField = document.getElementById("title");
//get the design and color 'select' elements
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
//payments section declarations
const paymentType = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
//activities declarations
const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
let activitiesTotalCost = 0;
const checkboxes = document.querySelectorAll("input[type=checkbox]");
//form validation declarations
const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form = document.querySelector("form");

jobRoleField.addEventListener("change", (e) => {
  /*In the conditional, if the value of the event target is equal to "other", 
display the “Other job role” field. And if the value any of the other options, hide it.*/
  if (e.target.value === "other") {
    otherRoleField.style.display = "block";
  } else {
    otherRoleField.value = "";
    otherRoleField.style.display = "none";
  }
});
//color field disabled by default when page loads
shirtColor.disabled = true;

//event listener (change) for when an item/option is selected from the design 'menu'/option list
shirtDesign.addEventListener("change", (e) => {
  //color field disabled on page load
  shirtColor.disabled = false;

  //loop over the option element children of the "color" <select> element.
  for (let i = 0; i < shirtColor.length; i++) {
    let shirtDesignValue = e.target.value;
    let shirtDataTheme = shirtColor[i].getAttribute("data-theme");

    /* ATTRIBUTION for the regex format below (  / *\([^)]*\) * /g, "") to thejh, dated 27 Nov 2010
https://stackoverflow.com/questions/4292468/javascript-regex-remove-text-between-parentheses */

    //helper function that removes content in brackets from the options menu (select id = 'color')
    function showHideShirts(bool, item, arr) {
      item.children[arr].hidden = bool;
      item.children[arr].text = item.children[arr].text.replace(
        / *\([^)]*\) */g,
        ""
      );
    }
    /* checks if the two variables that were just created are equal to one another. 
    If yes, set hidden property of the loop’s current option element to false, and set 
    the selected attribute of the loop’s current option element to true. And visa versa.*/
    if (shirtDesignValue !== shirtDataTheme) {
      showHideShirts(true, shirtColor, i);
    } else if (shirtDesignValue === shirtDataTheme) {
      showHideShirts(false, shirtColor, i);
      shirtColor.selectedIndex = i - 2;
    }
  }
});
//event listener to listen for a change regarding the checkbox (tick or untick)
activities.addEventListener("change", (e) => {
  //variable to hold the cost of the selected element (converted to number thanks to '+')
  const activitySelectedCost = +e.target.getAttribute("data-cost");

  /*if the target is checked, add the cost to the activitiesTotalCost variable. 
    If unchecked, reduce by the amount of that element*/
  if (e.target.checked) {
    activitiesTotalCost += activitySelectedCost;
  }
  if (e.target.checked === false) {
    activitiesTotalCost -= activitySelectedCost;
  }
  //Update the <p> "activities-cost" value with the total selected activities cost (activitiesTotalCost)
  activitiesCost.innerHTML = `Total: $${activitiesTotalCost}`;
});

//hide paypal and bitcoin when page loads (credit card is loaded and selected by default).
paypal.hidden = true;
bitcoin.hidden = true;

/*Use the payment variable (paymentType) to target the element’s second child element 
and give it the selected property. */
paymentType.children[1].selected = true;
paymentType.setAttribute("value", paymentType.children[1].value);

/*event listener to identify changes to selection of the payment method, and display the correct 
div (credit card, paypal or bitcoin) accordingly */
paymentType.addEventListener("change", (e) => {

  function showHidePaymentType(creditBool, bitcoinBool, paypalBool, arr) {
    creditCard.hidden = creditBool;
    bitcoin.hidden = bitcoinBool;
    paypal.hidden = paypalBool;
    paymentType.setAttribute("value", paymentType.children[arr].value);
  }

  if (e.target.value === "credit-card") {
    showHidePaymentType(false, true, true, 1);
  } else if (e.target.value === "paypal") {
    showHidePaymentType(true, true, false, 2);
  } else if (e.target.value === "bitcoin") {
    showHidePaymentType(true, false, true, 3);
  }
});

// the below code make the focus states of the different activities more obvious to all users.
checkboxes.forEach((cb) => {
  //for the current checkbox in checkboxes selected, add a focus class
  cb.addEventListener("focus", (e) => {
    cb.parentElement.classList.add("focus");
  });
  //when a different checkbox is selected, remove the previous focus class from this element
  cb.addEventListener("blur", (e) => {
    const active = document.querySelector(".focus");
    if (active) {
      active.classList.remove("focus");
    }
  });
});
//helper functions to assist with conditionals for field validation
function valid(field) {
  field.parentElement.classList.remove("not-valid");
  field.parentElement.classList.add("valid");
  field.parentElement.lastElementChild.style.display = "none";
}
function notValid(field) {
  field.parentElement.classList.add("not-valid");
  field.parentElement.lastElementChild.style.display = "block";
  //e.preventDefaul();
}
function validityListener(test, element, e) {
  if (!test(e.target.value)) {
    notValid(element);
    //e.preventDefault();
  } else {
    valid(element);
  }
}
//regex functions:
function isValidName(name) { return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);}
function isValidEmail(email) { return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email); }
function isValidCardNumber(card) { return /^\d{13,16}$/.test(card);}
function isValidZipCode(zipcode) { return /^\d{5}$/.test(zipcode);}
function isValidCvv(cvv) { return /^\d{3}$/.test(cvv); }

//event listeners for each field, to get instant feedback re validity.
nameField.addEventListener("input", (e) => { validityListener(isValidName, nameField, e);});
email.addEventListener("input", (e) => { validityListener(isValidEmail, email, e); });
cardNumber.addEventListener("input", (e) => { validityListener(isValidCardNumber, cardNumber, e);});
zipCode.addEventListener("input", (e) => { validityListener(isValidZipCode, zipCode, e); });
cvv.addEventListener("input", (e) => { validityListener(isValidCvv, cvv, e); });
activities.addEventListener("change", (e) => { if (activitiesTotalCost === 0) {
    e.preventDefault();
    activities.lastElementChild.style.display = "block";
  } else {
    activities.lastElementChild.style.display = "none";
  }
});
  /* test whether all form fields are valid and have entries - if invalid then prevent the form 
  from submitting, but if all form field entries are valid, then submit form */
form.addEventListener("submit", (e) => {
//Helper function to reduce repeat code
  function validitySubmitListener(test, element, optionalCondition) {
    if (optionalCondition == undefined) {
      if (!test(element.value)) {
        notValid(element);
        e.preventDefault();
      } else {
        valid(element);
      }
    }
      else if (optionalCondition != undefined) {
        if (!test(element.value) && optionalCondition.hidden == false) {
          notValid(element);
          e.preventDefault();
        } else {
          valid(element);
        }
      }
  }
  validitySubmitListener(isValidName, nameField);
  validitySubmitListener(isValidEmail, email);
  validitySubmitListener(isValidCardNumber, cardNumber, creditCard);
  validitySubmitListener(isValidZipCode, zipCode, creditCard);
  validitySubmitListener(isValidCvv, cvv, creditCard);
  if (activitiesTotalCost === 0) {
    e.preventDefault();
    activities.lastElementChild.style.display = "block";
  } else {
    activities.lastElementChild.style.display = "none";
  }
}); //------------------------------------------------------------------------------
