# Disallows unescaped variables of uncertain origin from href and src values, due to the concern that they might originate from user input.

## Rule details
The following patterns are considered warnings:

```javascript
    const userInput = prompt("What input do you like?");
    
    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);
    
    // Assign link destination to variable
    a.href = userInput;
    
    document.body.appendChild(a);
```
```javascript
    const userInput = prompt("What input do you like?");
    
    // Initialize iframe
    let iframe = document.createElement("iframe");
    
    // Assign link destination to variable
    iframe.src = userInput;
    
    document.body.appendChild(iframe);
```
```javascript
    // Declare safe variable
    let googleLink = "google.com";

    // Re-assign to unknown user input
    googleLink = prompt("What input do you like?");

    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);

    // Insert link to variable
    a.href = googleLink;

    document.body.appendChild(a);
```
```javascript
    // Declare safe variable
    let googleLink = "google.com";

    // Re-assign to unknown user input
    googleLink = prompt("What input do you like?");

    // Initialize iframe
    let iframe = document.createElement("iframe");

    // Insert link to variable
    iframe.src = googleLink;

    document.body.appendChild(iframe);
```
```javascript
    let googleLink = "google.com" + "/contact"
    const userInput = prompt("What input do you like?");
    
    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);
    
    // Assign link value to the result of the safe addition, plus the result of some unsafe input
    a.href = userInput + googleLink;
    
    document.body.appendChild(a);
```
```javascript
    // Declare variable, initialised as a safe concatenation of two explicit strings
    let googleLink = "google.com" + "/contact"
    const userInput = prompt("What input do you like?");
    
    // Initialize iframe
    let iframe = document.createElement("iframe");
    
    // Assign link value to the result of the safe addition, plus the result of some unsafe input
    iframe.src = userInput + googleLink;
    
    document.body.appendChild(iframe);
```
```javascript
    const userInput = prompt("What input do you like?");
    
    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);
    
    // Insert template string including variable value as link destination
    a.href = `${userInput}`;
    
    document.body.appendChild(a);
```
```javascript
    const userInput = prompt("What input do you like?");
    
    // Initialize iframe
    let iframe = document.createElement("iframe");
    
    // Insert template string including variable value as src destination
    iframe.src = `${userInput}`;
    
    document.body.appendChild(iframe);
```

The following patterns are NOT considered warnings:
```javascript
    // Declare variable, initialised as a safe concatenation of two explicit strings
    let googleLink3 = "google.com" + "/contact";

    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);

    // Assign link value to the result of the safe addition, plus the result of some unsafe input
    a.href = googleLink3 + "/address";

    document.body.appendChild(a);
```
```javascript
    // Declare variable, initialised as a safe concatenation of two explicit strings
    let googleLink3 = "google.com" + "/contact";

    // Initialize iframe
    let iframe = document.createElement("iframe");

    // Assign link value to the result of the safe addition, plus the result of some unsafe input
    iframe.src = googleLink3 + "/address";

    document.body.appendChild(iframe);
```
```javascript
    // Declare and initialise variable as explicit string
    let googleLink = "google.com";

    // Re-assign variable to potentially unsafe input
    googleLink = prompt("What input do you like?");

    // Re-assign variable again, to safe explicit string
    googleLink = "drive.google.com";

    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);

    // Insert variable value as link destination
    a.href = googleLink;

    document.body.appendChild(a);
```
```javascript
    // Declare and initialise variable as explicit string
    let googleLink = "google.com";

    // Re-assign variable to potentially unsafe input
    googleLink = prompt("What input do you like?");

    // Re-assign variable again, to safe explicit string
    googleLink = "drive.google.com";

    // Initialize iframe
    let iframe = document.createElement("iframe");

    // Insert variable value as link destination
    iframe.src = googleLink;

    document.body.appendChild(iframe);
```

```
    // Declare and initialise variable as explicit string
    let googleLink = "google.dk";

    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);

    // Set link destination as value of safe string
    a.href = googleLink;

    document.body.appendChild(a);
```
```javascript
    // Declare and initialise variable as explicit string
    let googleLink = "google.dk";

    // Initialize iframe
    let iframe = document.createElement("iframe");

    // Set link destination as value of safe string
    iframe.src = googleLink;

    document.body.appendChild(iframe);
```
```javascript
    const myLink = "google.com";

    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);

    // Insert template string including variable value as link destination
    a.href = `${myLink}`;

    document.body.appendChild(a);
```
```javascript
    const myLink = "google.com";

    // Initilize iframe
    let iframe = document.createElement("iframe");

    // Insert template string including variable value as link destination
    iframe.src = `${myLink}`;

    document.body.appendChild(iframe);
```
```javascript
    let userInput = prompt("What input do you like?");

    // Create text link
    let a = document.createElement("a");
    const btn = document.createTextNode("Click here");
    a.appendChild(btn);

    // Assign link destination to an escaped version of the unsafe user input
    a.href = userInput.toLowerCase().replace('javascript:', '/javascript/:/');

    document.body.appendChild(a);
```
```javascript
    let userInput = prompt("What input do you like?");

    // Initialize iframe
    let iframe = document.createElement("iframe");

    // Assign link destination to an escaped version of the unsafe user input
    iframe.src = userInput.toLowerCase().replace('javascript:', '/javascript/:/');

    document.body.appendChild(iframe);
```