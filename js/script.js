const nameField = document.getElementById("name").focus(); //start the page with name as focus

//Hide the other role field by default when the page loads
const otherRoleField = document.getElementById("other-job-role");
otherRoleField.style.display = "none"; //hiding the other job role field by default

const jobRoleField = document.getElementById("title");

/*Event listener whereby when a "change" is detected, use a conditional statement 
to check the value property of the element. */
jobRoleField.addEventListener("change", (e) => {
  console.log(e.target.value); //to be removed - just for testing.

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
  for (let i = 0; i < color.children.length; i++) {
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
      color.children[0].text = 'Select Shirt Colour'; //not sure if necessary/correct
    } else if (designOption === dataTheme) {
      color.children[i].hidden = false;
      color.children[0].selected = true;
      color.children[0].text = 'Select Shirt Colour'; //not sure if necessary/correct
    }

  }
});
