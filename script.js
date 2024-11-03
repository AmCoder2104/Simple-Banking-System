// Select elements from the DOM to display account details and transaction messages
let a = document.querySelector(".accountdetails");
let b = document.querySelector(".accountdetails2");
let d = document.querySelector(".deposit");
let t = document.querySelector(".take");
let c = document.querySelector(".check");
let q = document.querySelector(".quit");

// Check if account details are already stored in localStorage
// If both 'accountnumber' and 'accountid' exist, display them and proceed to the transaction function
if (localStorage.getItem("accountnumber") && localStorage.getItem("accountid")) {
    let accountnumber = localStorage.getItem("accountnumber");
    let accountid = localStorage.getItem("accountid");
    a.innerHTML = `Your Account Number is ${accountnumber}`;
    b.innerHTML = `Your account id is ${accountid}`;
    transaction(); // Call the transaction function
} else {
    // If account details are not found, call the createAccount function to create a new account
    createaccount();
}

// Function to create a new account
function createaccount() {
    let response = prompt("Create Account");
    let num = Math.floor(12987 + Math.random() * 14567); // Generate a random account number
    console.log(num); // Display the generated account number in the console

    // If the user enters 'create', proceed to account creation
    if (response === "create") {
        a.innerHTML = `Your Account Number is ${num}`;

        // Prompt for the account name and check if the first character is uppercase
        let x = prompt("Enter Account name");
        if (x.charAt(0) == x.charAt(0).toUpperCase()) {
            b.innerHTML = `Your Account id is ${x}${num}`;
            let accountId = `${x}${num}`; // Create the account ID using the name and account number
            b.innerHTML = `Your Account id is ${accountId}`;

            // Store the account number and account ID in localStorage
            localStorage.setItem("accountnumber", num);
            localStorage.setItem("accountid", accountId);

            transaction(); // Call the transaction function
        }
    } else {
        // If the user enters an invalid command, log a message to the console
        console.log("invalid command! Try Again");
    }
}

// Function to handle transactions (deposit, withdraw, check balance, exit)
function transaction() {
    // Set an initial balance of 1000 when a new account is opened
    let balance = 1000;
    let keepgoing = true;

    // Loop to continue transactions until the user chooses to exit
    while (keepgoing) {
        // Prompt the user to choose a transaction type
        const command = prompt('Choose: \n1. Deposit \n2. Take \n3. Check \n4. Exit');

        // If the user cancels the prompt, break the loop
        if (command === null) {
            break;
        }

        // Handle deposit option
        if (command === '1' || command.toLowerCase() === "deposit") {
            let depositedamount = parseFloat(prompt("Enter deposit Amount")); // Prompt for deposit amount
            if (!isNaN(depositedamount)) {
                balance += depositedamount; // Add the deposited amount to the balance
                d.innerHTML = `You have deposited: ${depositedamount}<br>Your new balance is:<br> ${balance}`;
            } else {
                // If the user enters an invalid amount, display an error message
                d.innerHTML = `Invalid command`;
            }
        }

        // Handle withdrawal option
        else if (command === '2' || command.toLowerCase() === "take") {
            let withdraw = parseFloat(prompt("Enter withdrawal amount")); // Prompt for withdrawal amount
            if (!isNaN(withdraw)) {
                if (withdraw <= balance) {
                    // Deduct the withdrawal amount from the balance if there are sufficient funds
                    balance -= withdraw;
                    t.innerHTML = `You have withdrawn: ${withdraw}<br>Your new balance is:<br> ${balance}`;
                } else {
                    // If the withdrawal amount exceeds the balance, display an error message
                    t.innerHTML = `Insufficient funds.`;
                }
            } else {
                // If the user enters an invalid amount, display an error message
                t.innerHTML = `Invalid amount`;
            }
        }

        // Handle check balance option
        else if (command === '3' || command.toLowerCase() === "check") {
            c.innerHTML = `Your balance is ${balance}`; // Display the current balance
        }

        // Handle exit option
        else if (command === '4' || command.toLowerCase() === "exit") {
            q.innerHTML = `Thank you for using our service!`; // Display exit message
            keepgoing = false; // End the loop to stop transactions
        }

        // If the user enters an invalid option, display an error message
        else {
            q.innerHTML = `Invalid command. Please try again.`;
        }
    }
}
