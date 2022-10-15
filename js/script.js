const nameField = document.getElementById("name");
nameField.focus(); //start the page with name as focus

//Hide the other role field by default when the page loads
const otherRoleField = document.getElementById("other-job-role");
otherRoleField.style.display = "none"; //hiding the other job role field by default

const jobRoleField = document.getElementById("title");

/*Event listener whereby when a "change" is detected, use a conditional statement 
to check the value property of the element. */
jobRoleField.addEventListener("change", (e) => {
  /*In the conditional, if the value of the event target is equal to "other", 
display the “Other job role” field. And if the value any of the other options, hide it.
Have also included a wipe of the value of the other field (if the user selects a different drop-down
once again)*/
  if (e.target.value === "other") {
    otherRoleField.style.display = "block";
  } else {
    otherRoleField.value = "";
    otherRoleField.style.display = "none";
  }
});

//get the design and color 'select' elements
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");

//color field disabled by default when page loads
shirtColor.disabled = true;

//event listener (change) for when an item/option is selected from the design 'menu'/option list
shirtDesign.addEventListener("change", (e) => {
  //color field disabled on page load
  shirtColor.disabled = false;

  //point 5 of guide
  /*Also in the event listener, loop over the option element children of the 
  "Color" <select> element. The children property will be helpful here.*/
  for (let i = 0; i < shirtColor.length; i++) {
    let shirtDesignValue = e.target.value;
    let shirtDataTheme = shirtColor[i].getAttribute("data-theme");

    //point 8 of guide - needs work, not sure if 100% correct
    /*Still in the loop, create a conditional that checks if the two variables that were 
just created are equal to one another. If they are, set the hidden property of the loop’s 
current option element to false, and set the selected attribute of the loop’s current 
option element to true. And if the two variables are not equal to one another, set the hidden 
property of the loop’s current option element to true, and set the selected attribute of the 
loop’s current option element to false.*/
    if (shirtDesignValue !== shirtDataTheme) {
      shirtColor.children[i].hidden = true;
      /* ATTRIBUTION for the regex format (  / *\([^)]*\) * /g, "") to thejh, dated 27 Nov 2010
      https://stackoverflow.com/questions/4292468/javascript-regex-remove-text-between-parentheses 
      (and again, a few lines below) */
      shirtColor.children[i].text = shirtColor.children[i].text.replace(  / *\([^)]*\) */g, "");
      shirtColor.firstElementChild.selected = true;
      shirtColor.children[0].text = "Select Shirt Colour";
    } else if (shirtDesignValue === shirtDataTheme) {
        shirtColor.children[i].hidden = false;
        shirtColor.children[i].text = shirtColor.children[i].text.replace(  / *\([^)]*\) */g, "");
        shirtColor.firstElementChild.selected = true;
        shirtColor.children[0].text = "Select Shirt Colour";
    }
  }
});

//TODO: Make the variables 'friendlier' and easier to place/read for the code.

const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
let activitiesTotalCost = 0;

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

//7. "Payment Info" section (update comment at a later stage):

//create variables that we are going to use for the payments section
const paymentType = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

//hide paypal and bitcoin when page loads, as credit card will be loaded and selected by default.
paypal.hidden = true;
bitcoin.hidden = true;

/*Use the payment variable (paymentType) to target the element’s second child element 
and give it the selected property. The .children property and the setAttribute 
method will be helpful here. - notes from guide. */
paymentType.children[1].selected = true;
paymentType.setAttribute("value", paymentType.children[1].value);

/*event listener to identify changes to selection of the payment method, and display the correct 
div accordingly - NB for notes: CAN IMPROVE THE BELOW CODE - LOTS OF REPEAT */

/* see below from guide to improve my below section of code - rework all: 
Use the payment variable above to listen for the change event on this element. When a 
change is detected, display the <div> element with the id that matches the value of the 
event.target element. And hide the other two <div> elements.*/

paymentType.addEventListener("change", (e) => {
  if (e.target.value === "credit-card") {
    creditCard.hidden = false;
    bitcoin.hidden = true;
    paypal.hidden = true;
    paymentType.setAttribute("value", paymentType.children[1].value);
  } else if (e.target.value === "paypal") {
    creditCard.hidden = true;
    bitcoin.hidden = true;
    paypal.hidden = false;
    paymentType.setAttribute("value", paymentType.children[2].value);
  } else if (e.target.value === "bitcoin") {
    creditCard.hidden = true;
    paypal.hidden = true;
    bitcoin.hidden = false;
    paymentType.setAttribute("value", paymentType.children[3].value);
  }
});

//declaring variables for form validation section
// The "Name" <input type="text"> element (should already have a variable)
//nameField
// The "Email Address" <input type="text"> element
const email = document.getElementById("email");
// The "Register for Activities" <fieldset> element (should already have a variable)
//activities
// The "Card number" <input type="text"> element
const cardNumber = document.getElementById("cc-num");
// The "Zip code" <input type="text"> element
const zipCode = document.getElementById("zip");
// The "CVV" <input type="text"> element
const cvv = document.getElementById("cvv");
// The <form> element
const form = document.querySelector("form");

//Use the "form" variable to listen for the keyup event.
form.addEventListener("submit", (e) => {
  /*Inside the event listener, use the name variable, dot notation 
and the value property to create a new variable that references the value 
of the different fields.*/
  const nameValue = nameField.value;
  const emailValue = email.value;
  const cardNumberValue = cardNumber.value;
  const zipCodeValue = zipCode.value;
  const cvvValue = cvv.value;

  /* Note from guide: Inside the event listener is ultimately where the required fields or sections 
will be tested. But rather than creating all the tests there, it can be helpful to create 
helper functions for each required field that can then be called in the event listener to do 
the testing and return true or false depending on whether the field is valid or not.
TO DO / UDPATE / IMPROVE */

  //name regex - code structure taken from the 'warm-up' projects.
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
  //email regex - code structure taken from the 'warm-up' projects.
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  //card number regex
  const cardNumberIsValid = /^\d{13,16}$/.test(cardNumberValue);
  //Zipcode regex
  const zipCodeIsValid = /^\d{5}$/.test(zipCodeValue);
  //CVV regex
  const cvvIsValid = /^\d{3}$/.test(cvvValue);

  /*if any of the field inputs are invalid, do not allow submission of form.
I assume this will need to be reworked.
credit card fields should only be validated if "credit card" is the selected payment method.*/

//functions to assist with the repeat-nature of the code in the 'if statements' below.
  function notValid(field) {
    field.parentElement.classList.add("not-valid");
    field.parentElement.lastElementChild.style.display = 'block';
    e.preventDefault();
  }
  function valid(field) {
    field.parentElement.classList.remove("not-valid");
    field.parentElement.classList.add("valid");
    field.parentElement.lastElementChild.style.display = 'none';
  }
//if any of the fields regex tests come back as 'false', utilise notValid func above, else valid func.
  if (!nameIsValid) {
    notValid(nameField);
  } else {
    valid(nameField);
  }
  if (!emailIsValid) {
    notValid(email);
  } else {
    valid(email);
  }
  if (!cardNumberIsValid && creditCard.hidden == false) {
    notValid(cardNumber);
  } else {
    valid(cardNumber);
  }
  if (!zipCodeIsValid && creditCard.hidden == false) {
    notValid(zipCode);
  } else {
    valid(zipCode);
  }
  if (!cvvIsValid && creditCard.hidden == false) {
    notValid(cvv);
  } else {
    valid(cvv);
  }
});

const checkboxes = document.querySelectorAll("input[type=checkbox]");

//Received assistance here through the pratice workbooks. To clean up.
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
