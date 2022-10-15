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
const design = document.getElementById("design");
const color = document.getElementById("color");

//color field disabled by default when page loads
color.disabled = true;

//event listener (change) for when an item/option is selected from the design 'menu'/option list
design.addEventListener("change", (e) => {
  //color field disabled on page load
  color.disabled = false;

  //point 5 of guide
  /*Also in the event listener, loop over the option element children of the 
  "Color" <select> element. The children property will be helpful here.*/
  for (let i = 0; i < color.length; i++) {
    let designOption = e.target.value;
    let dataTheme = color[i].getAttribute("data-theme");

    //think the below logic needs some work. When flipping between, doesn't change default value;
    //point 8 of guide - needs work, not sure if 100% correct
    /*Still in the loop, create a conditional that checks if the two variables that were 
just created are equal to one another. If they are, set the hidden property of the loop’s 
current option element to false, and set the selected attribute of the loop’s current 
option element to true. And if the two variables are not equal to one another, set the hidden 
property of the loop’s current option element to true, and set the selected attribute of the 
loop’s current option element to false.*/
    if (designOption !== dataTheme) {
      color.children[i].hidden = true;
      color.children[0].selected = false;
      color.children[0].text = "Select Shirt Colour"; //not sure if necessary/correct
    } else if (designOption === dataTheme) {
      color.children[i].hidden = false;
      color.children[0].selected = true;
      color.children[0].text = "Select Shirt Colour"; //not sure if necessary/correct
    }
  }
});

//6. "Register for Activities" section (update comment at a later stage):

//TODO: Make the variables 'friendlier' and easier to place/read for the code.

const regForActivities = document.getElementById("activities");
const costActivities = document.getElementById("activities-cost");
let totalCostActivities = 0;

regForActivities.addEventListener("change", (e) => {
  //variable to hold the cost of the selected element (converted to number thanks to '+')
  dataCost = +e.target.getAttribute("data-cost");

  /*if the target is checked, add the cost to the totalCostActivities variable. 
    If unchecked, reduce by the amount of that element*/
  if (e.target.checked) {
    totalCostActivities += dataCost;
  }
  if (e.target.checked === false) {
    totalCostActivities -= dataCost;
  }
  //Update the <p> "activities-cost" value with the total selected activities cost (totalCostActivities)
  costActivities.innerHTML = `Total: $${totalCostActivities}`;
});

//7. "Payment Info" section (update comment at a later stage):

//create variables that we are going to use for the payments section
const paymentType = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

//hide paypal and bitcoin when page loads, as credit card will be loaded by default.
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
//regForActivities
// The "Card number" <input type="text"> element
const cardNumber = document.getElementById("cc-num");
// The "Zip code" <input type="text"> element
const zipCode = document.getElementById("zip");
// The "CVV" <input type="text"> element
const cvv = document.getElementById("cvv");
// The <form> element
const form = document.querySelector("form");

//Use the "form" variable to listen for the submit event.
form.addEventListener("submit", (e) => {

/*Inside the event listener, use the name variable, dot notation 
and the value property to create a new variable that references the value 
of the different fields.*/
const nameValue = nameField.value;
const emailValue = email.value;
const cardNumberValue = cardNumber.value;
const zipCodeValue = zipCode.value;
const cvvValue = cvv.value;

//name regex - code structure taken from the 'warm-up' projects.
const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);

//email regex - code structure taken from the 'warm-up' projects.
const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
console.log(`Name validation test on "${emailValue}" evaluates to ${emailIsValid}`);

//card number regex
const cardNumberIsValid = /^\d{13,16}$/.test(cardNumberValue);
console.log(`Name validation test on "${cardNumberValue}" evaluates to ${cardNumberIsValid}`);

//Zipcode regex
const zipCodeIsValid = /^\d{5}$/.test(zipCodeValue);
console.log(`Name validation test on "${zipCodeValue}" evaluates to ${zipCodeIsValid}`);

//CVV regex
const cvvIsValid = /^\d{3}$/.test(cvvValue);
console.log(`Name validation test on "${cvvValue}" evaluates to ${cvvIsValid}`);

/*Add a temporary event.preventDefault() statement to prevent the form 
from refreshing when the submit button is clicked.*/
e.preventDefault(); // 

});